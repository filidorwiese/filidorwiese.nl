import React from 'react'
import * as ReactGA from 'react-ga'
import styled, { keyframes } from 'styled-components'
import 'jquery-spriteanimator'
import 'jquery.easing'
import PropTypes from 'prop-types'

import filiSprites from '../../assets/images/fili-draggable.png'
import cursorGrab from '../../assets/images/grab.png'
import cursorGrabbing from '../../assets/images/grabbing.png'
import { breakpoints } from '../../utils/theme'

const falling = keyframes`
  from {
    transform: scale(1) rotate(360deg);
  }
  to {
    transform: scale(0) rotate(0deg);
  }
`

const Wrapper = styled.div`
  .fili {
    position: absolute;
    z-index: 1000;
    top: 80%;
    left: 31%;
    
    background: url(${filiSprites}) 0 0 no-repeat;
    width: 76px;
    height: 104px;

    &.falling {
      animation: ${falling} 2s ease-out 0s 1 forwards;
    }

    &.cursor-grab {
      cursor: url(${cursorGrab}), auto;
    }

    &.cursor-grabbing {
      cursor: url(${cursorGrabbing}), auto;
    }
  }

  @media (max-width: ${breakpoints[0]}) {
    .fili {
      display: none;
    }
  }
`

const LEFT_BUTTON = 0
const DRAG_THRESHOLD = 3
const MODES = {
  STANDING: 'STANDING',
  LOOKING: 'LOOKING',
  TAKINGCOVER: 'TAKINGCOVER',
  DRAGGING: 'DRAGGING',
  BOUNCING: 'BOUNCING',
  FALLING: 'FALLING'
}

class Fili extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      mouseDown: false,
      mode: MODES.STANDING,
      lastMoves: []
    }
  }

  componentDidMount () {
    this.$el = jQuery(this.el)
    this.fili = this.filiInit()

    const pageOffset = this.el.getBoundingClientRect()
    const parentOffset = document.getElementById('devices').getBoundingClientRect()

    this.setState({
      left: pageOffset.left,
      top: pageOffset.top + window.scrollY,
      elementX: pageOffset.left,
      elementY: pageOffset.top,
      parentOffsetX: parentOffset.left,
      parentOffsetY: parentOffset.top,
      width: pageOffset.width,
      height: pageOffset.height
    })

    document.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseEnter = () => {
    if (this.state.mode === MODES.STANDING || this.state.mode === MODES.LOOKING) {
      this.filiTakeCover()
      this.setState({
        cursor: 'grab'
      })
    }
  }

  onMouseOut = () => {
    if (this.state.mode === MODES.TAKINGCOVER) {
      this.filiStand()
    }
  }

  onMouseDown = (event) => {
    if (event.button === LEFT_BUTTON && this.state.mode === MODES.TAKINGCOVER) {
      event.stopPropagation()

      const pageOffset = this.el.getBoundingClientRect()
      this.setState({
        mouseDown: true,
        originX: event.pageX,
        originY: event.pageY,
        elementX: pageOffset.left,
        elementY: pageOffset.top,
        cursor: 'grabbing'
      })

      document.addEventListener('mouseup', this.onMouseUp)
      document.body.style.userSelect = 'none'
      document.body.style.overflowX = 'hidden'
    }
  }

  onMouseMove = (event) => {
    // Collect last 10 moves for velocity effects
    const lastMoves = this.state.lastMoves
    lastMoves.push([event.pageX, event.pageY])
    if (lastMoves.length > 10) lastMoves.shift()

    if (this.state.mouseDown || this.state.mode === MODES.DRAGGING) {
      this.onMouseMoveDragging(event)
    } else if (this.state.mode === MODES.STANDING || this.state.mode === MODES.LOOKING) {
      this.onMouseMoveLooking(event)
    }
  }

  onMouseMoveLooking = (event) => {
    const {x, y} = this.getFiliAnchorPoint()
    const distance = this.getDistance(x, y, event.pageX, event.pageY)
    const {velocity} = this.getVelocity()

    if (velocity > 300 || distance < 150 || this.state.mode === MODES.LOOKING) {
      let angle = Math.atan2(event.pageY - y, event.pageX - x) * 180 / Math.PI
      angle = Math.floor((angle + 360) % 360)
      this.filiLook(angle)

      // Loose interest after some time
      window.clearTimeout(this.clearLookingTimeoutId)
      this.clearLookingTimeoutId = setTimeout(() => {
        if (this.state.mode === MODES.LOOKING) this.filiStand()
      }, 750)
    }
  }

  onMouseMoveDragging = (event) => {
    const deltaX = event.pageX - this.state.originX
    const deltaY = event.pageY - this.state.originY
    const distance = Math.abs(deltaX) + Math.abs(deltaY)

    if (this.state.mode === MODES.TAKINGCOVER && distance > DRAG_THRESHOLD) {
      this.props.isDraggingFn(true)
      this.filiStruggle()
    }

    // Drag with mouse but stick to viewport constraints
    if (this.state.mode === MODES.DRAGGING) {
      const pageWidth = document.documentElement.clientWidth
      const pageHeight = document.documentElement.clientHeight
      let left = this.state.elementX + deltaX
      if (left < 0) left = 0
      if (left > pageWidth - this.state.width) left = pageWidth - this.state.width

      let top = this.state.elementY + deltaY + window.scrollY
      if (top < window.scrollY) top = window.scrollY
      if (top > window.scrollY + pageHeight - this.state.height) top = window.scrollY + pageHeight - this.state.height

      this.setState({
        left,
        top
      })
    }
  }

  onMouseUp = () => {
    document.removeEventListener('mouseup', this.onMouseUp)
    document.body.style.userSelect = 'auto'
    document.body.style.overflowX = 'auto'

    const {x, y} = this.getFiliAnchorPoint()
    if (this.props.raycastDevicesFn(x, y)) {

      this.filiFalling()

    } else {
      if (this.state.mode === MODES.DRAGGING) {
        this.props.isDraggingFn(false)
        this.setState({
          mouseDown: false,
          cursor: 'grab'
        })
      }

      // Was fili thrown? If so, how far?
      const {velocity, velocityX, velocityY} = this.getVelocity()
      if (velocity > 50) {
        const bounceX = Math.floor(velocityX * .6)
        const bounceY = Math.floor(Math.abs(velocityY * .4))

        this.filiBounce(bounceX, bounceY, 800)

      } else {

        this.filiTakeCover()

      }
    }
  }

  getVelocity = () => {
    const firstMove = this.state.lastMoves[0]
    const lastMove = this.state.lastMoves[this.state.lastMoves.length - 1]
    const velocityX = Math.floor(lastMove[0] - firstMove[0])
    const velocityY = Math.floor(lastMove[1] - firstMove[1])
    const velocity = Math.abs(velocityX) + Math.abs(velocityY)

    return {
      velocityX,
      velocityY,
      velocity
    }
  }

  getDistance = (x1, y1, x2, y2) => {
    let xs = x2 - x1,
      ys = y2 - y1

    xs *= xs
    ys *= ys

    return Math.sqrt(xs + ys)
  }

  getFiliAnchorPoint = () => ({
    x: this.state.left + (this.state.width / 2),
    y: this.state.top + (this.state.height / 2)
  })

  filiInit = () => {
    const fili = this.$el.spriteAnimator({
      debug: false,
      cols: 5,
      rows: 5,
      startFrame: 1
    })
    fili.addScript('take-cover', [
      {sprite: 2},
      {sprite: 3},
      {sprite: 4},
      {sprite: 5}
    ])
    fili.addScript('struggle', [
      {sprite: 6},
      {sprite: 7},
      {sprite: 8},
      {sprite: 9},
      {sprite: 10}
    ])
    fili.addScript('stand', [
      {sprite: 3},
      {sprite: 2},
      {sprite: 1}
    ])
    return fili
  }

  filiStand = () => {
    if (this.state.mode === MODES.TAKINGCOVER) {
      this.fili.play({
        run: 1,
        delay: 20,
        script: 'stand'
      })
    } else {
      this.fili.showSprite(1)
    }

    this.setState({
      mode: MODES.STANDING
    })
  }

  filiTakeCover = () => {
    if (this.state.mode === MODES.STANDING || this.state.mode === MODES.LOOKING) {
      this.fili.play({
        run: 1,
        delay: 20,
        script: 'take-cover'
      })
    } else {
      this.fili.showSprite(5)
    }
    this.setState({
      mode: MODES.TAKINGCOVER
    })
  }

  filiLook = (angle) => {
    this.setState({
      mode: MODES.LOOKING
    })

    const gaze = 15
    const directions = {
      NORTH: 270,
      EAST: 360,
      SOUTH: 90,
      WEST: 180
    }

    if (angle > directions.EAST - gaze && angle >= 0 ||
      angle >= directions.EAST - 360 && angle < directions.EAST + gaze - 360 // east
    ) {
      this.fili.showSprite(21)
    } else if (angle >= directions.EAST + gaze - 360 && angle <= directions.SOUTH - gaze) { // south-east
      this.fili.showSprite(19)
    } else if (angle > directions.SOUTH - gaze && angle < directions.SOUTH + gaze) { // south
      this.fili.showSprite(18)
    } else if (angle >= directions.SOUTH + gaze && angle <= directions.WEST - gaze) { // south-west
      this.fili.showSprite(17)
    } else if (angle > directions.WEST - gaze && angle < directions.WEST + gaze) { // west
      this.fili.showSprite(16)
    } else if (angle >= directions.WEST + gaze && angle <= directions.NORTH - gaze) { // north-west
      this.fili.showSprite(24)
    } else if (angle > directions.NORTH - gaze && angle < directions.NORTH + gaze) { // north
      this.fili.showSprite(23)
    } else if (angle >= directions.NORTH + gaze && angle <= directions.EAST - gaze) { // north-east
      this.fili.showSprite(22)
    }
  }

  filiStruggle = () => {
    this.setState({
      mode: MODES.DRAGGING
    })

    this.fili.play({
      run: -1,
      delay: 100,
      script: 'struggle'
    })
  }

  filiBounce = (bounceX, bounceY, duration) => {
    this.setState({
      mode: MODES.BOUNCING
    })

    let numberOfBounces = 0
    if (bounceX > 0) {
      this.fili.showSprite(12)
    } else {
      this.fili.showSprite(11)
    }

    // X bounce
    this.$el.clearQueue().stop(true).animate({
      'left': '+=' + bounceX
    }, {
      duration: duration,
      easing: 'easeOutQuint',
      queue: false,
      step: (now) => {
        if (numberOfBounces > 0) { return false }

        // Reverse bounce if fili hits a border
        if (now + this.state.parentOffsetX < 0 || now + this.state.parentOffsetX + this.state.width > document.documentElement.clientWidth) {
          numberOfBounces++
          this.$el.clearQueue().stop(true)
          bounceX = (bounceX * .5) * -1
          bounceY = bounceY * .8
          duration *= .8
          this.filiBounce(bounceX, bounceY, duration)
        }
      },
      complete: () => {
        this.setState({left: this.$el.offset().left})
      }
    })

    // Y bounce
    this.$el.animate({
      'top': '+=' + bounceY
    }, {
      duration: duration / 2,
      easing: 'easeOutBounce',
      queue: false,
      complete: () => {
        this.setState({top: this.$el.offset().top})
        ReactGA.event({
          category: 'User',
          action: `Thrown fili`
        })
        setTimeout(this.filiStand, 200)
      }
    })
  }

  filiFalling = () => {
    this.$el.addClass('falling')
    this.setState({
      mode: MODES.FALLING
    })

    setTimeout(() => {
      this.props.isDraggingFn(false)
      this.el.remove()
      jQuery('#page-static-overlay').show()

      // Redirect to galaxy.fili.nl
      setTimeout(() => {
        window.location = 'https://galaxy.fili.nl'

        ReactGA.event({
          category: 'User',
          action: `Lost fili`
        })
      }, 350)
    }, 2000)
  }

  render () {
    const position = typeof this.state.top !== 'undefined' ? {
      top: this.state.top - this.state.parentOffsetY,
      left: this.state.left - this.state.parentOffsetX
    } : {}

    return <Wrapper>
      <div
        ref={el => this.el = el}
        onMouseEnter={this.onMouseEnter}
        onMouseOut={this.onMouseOut}
        onMouseDown={this.onMouseDown}
        className={`fili cursor-${this.state.cursor}`}
        style={position}
      />
    </Wrapper>
  }
}

Fili.propTypes = {
  isDraggingFn: PropTypes.func,
  raycastDevicesFn: PropTypes.func
}

export default Fili
