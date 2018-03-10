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
  TAKINGCOVER: 'TAKINGCOVER',
  DRAGGING: 'DRAGGING',
  BOUNCING: 'BOUNCING',
  FALLING: 'FALLING',
  LOOKING: 'LOOKING'
}

class Fili extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      mouseDown: false,
      mode: MODES.STANDING
    }
  }

  componentDidMount () {
    this.$el = jQuery(this.el)
    this.fili = this.filiInit()

    const pageOffset = this.el.getBoundingClientRect()
    const parentOffset = document.getElementById('devices').getBoundingClientRect()
    this.setState({
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
    if (this.state.mode === MODES.STANDING) {
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
    if (event.button === LEFT_BUTTON) {
      event.stopPropagation()

      const pageOffset = this.el.getBoundingClientRect()
      this.setState({
        mouseDown: true,
        originX: event.pageX,
        originY: event.pageY,
        elementX: pageOffset.left,
        elementY: pageOffset.top,
        lastMoves: [],
        cursor: 'grabbing'
      })

      document.addEventListener('mouseup', this.onMouseUp)
      document.body.style.userSelect = 'none'
      document.body.style.overflowX = 'hidden'
    }
  }

  onMouseMove = (event) => {
    if (this.state.mouseDown || this.state.mode === MODES.DRAGGING) {
      this.onMouseMoveDragging(event)
    } else if (this.state.mode === MODES.STANDING) {
      this.onMouseMoveLooking(event)
    }
  }

  onMouseMoveLooking = (event) => {
    // console.log('looking')
    // const angleDeg = Math.atan2(this.state.elementY + this.state.height - event.pageY, this.state.elementX + this.state.width - event.pageX)
    // console.log(Math.floor(angleDeg), this.state.elementY, this.state.elementX, event.pageX, event.pageY)
  }

  onMouseMoveDragging = (event) => {
    // console.log('dragging', event.pageX, event.pageY)
    const deltaX = event.pageX - this.state.originX
    const deltaY = event.pageY - this.state.originY
    const distance = Math.abs(deltaX) + Math.abs(deltaY)

    if (this.state.mode !== MODES.DRAGGING && distance > DRAG_THRESHOLD) {
      this.props.isDraggingFn(true)
      this.filiStruggle()
    }

    if (this.state.mode === MODES.DRAGGING) {
      // Drag with mouse but keep viewport constraints
      const pageWidth = document.documentElement.clientWidth
      const pageHeight = document.documentElement.clientHeight
      let left = this.state.elementX + deltaX
      if (left < 0) left = 0
      if (left > pageWidth - this.state.width) left = pageWidth - this.state.width

      let top = this.state.elementY + deltaY + window.scrollY
      if (top < window.scrollY) top = window.scrollY
      if (top > window.scrollY + pageHeight - this.state.height) top = window.scrollY + pageHeight - this.state.height

      // Collect last moves for bounce effect
      const lastMoves = this.state.lastMoves
      lastMoves.push([deltaX, deltaY])
      if (lastMoves.length > 10) lastMoves.shift()

      this.setState({
        left,
        top,
        lastMoves
      })
    }
  }

  onMouseUp = () => {
    document.removeEventListener('mouseup', this.onMouseUp)
    document.body.style.userSelect = 'auto'
    document.body.style.overflowX = 'auto'

    if (this.isFiliInDevice()) {

      this.filiFalling()

    } else {
      if (this.state.mode === MODES.DRAGGING) {
        this.props.isDraggingFn(false)
        this.setState({
          mouseDown: false,
          cursor: 'grab'
        })
      }

      // Calculate if fili was thrown (and how far)
      if (this.state.lastMoves.length) {
        const firstMove = this.state.lastMoves[0]
        const lastMove = this.state.lastMoves[this.state.lastMoves.length - 1]
        const bounceX = (lastMove[0] - firstMove[0]) * .6
        const bounceY = Math.abs((lastMove[1] - firstMove[1]) * .4)

        if (Math.abs(bounceX) > 150 || Math.abs(bounceY) > 50) {

          this.filiBounce(bounceX, bounceY, 800)

        } else {

          this.filiTakeCover()

        }
      }
    }
  }

  getAnchorPosition = () => ({
    x: this.state.left + (this.state.width / 2),
    y: this.state.top + (this.state.height / 2)
  })

  isFiliInDevice = () => {
    let inDevice = false
    const { x, y } = this.getAnchorPosition()
    const devices = document.getElementsByClassName('static')

    for (let device of devices) {
      const devicePosition = {
        top: device.offsetTop + this.state.parentOffsetY,
        left: device.offsetLeft + this.state.parentOffsetX,
        width: device.offsetWidth,
        height: device.offsetHeight,
      }

      if (
        x > devicePosition.left && x < devicePosition.left + devicePosition.width &&
        y > devicePosition.top && y < devicePosition.top + devicePosition.height
      ) {
        inDevice = true
      }
    }

    return inDevice
  }

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
    this.setState({
      mode: MODES.STANDING
    })
    setTimeout(() => {
      this.fili.play({
        run: 1,
        delay: 20,
        script: 'stand'
      })
    }, 75)
  }

  filiTakeCover = () => {
    this.setState({
      mode: MODES.TAKINGCOVER
    })

    if (this.state.mode === MODES.STANDING) {
      this.fili.play({
        run: 1,
        delay: 20,
        script: 'take-cover'
      })
    } else {
      this.fili.showSprite(5)
    }
  }

  filiStruggle = () => {
    if (this.state.mode !== MODES.FALLING) {
      this.setState({
        mode: MODES.DRAGGING
      })
    }
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
      step: (now, fx) => {
        if (numberOfBounces > 0) { return false }

        // Reverse bounce if fili hits a border
        if (now + this.state.parentOffsetX < 0 || now + this.state.parentOffsetX + this.state.width > document.documentElement.clientWidth) {
          numberOfBounces++
          this.$el.clearQueue().stop(true)
          bounceX = (bounceX * .5) * -1
          bounceY = (bounceY * .8)
          duration *= .8
          this.filiBounce(bounceX, bounceY, duration)
        }
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
    return <Wrapper>
      <div
        ref={el => this.el = el}
        onMouseEnter={this.onMouseEnter}
        onMouseOut={this.onMouseOut}
        onMouseDown={this.onMouseDown}
        className={`fili cursor-${this.state.cursor}`}
        style={{
          top: this.state.top - this.state.parentOffsetY,
          left: this.state.left - this.state.parentOffsetX
        }}
      />
    </Wrapper>
  }
}

Fili.propTypes = {
  isDraggingFn: PropTypes.func
}

export default Fili
