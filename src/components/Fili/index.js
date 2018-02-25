import React from 'react'
import styled, { keyframes } from 'styled-components'
import 'jquery-spriteanimator'
import 'jquery.easing'
import PropTypes from 'prop-types'

import filiSprites from '../../assets/images/fili-draggable.png'
import cursorGrab from '../../assets/images/grab.png'
import cursorGrabbing from '../../assets/images/grabbing.png'
import { breakpoints } from '../../utils/theme'

const shrink = keyframes`
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
    
    &.shrink {
      animation: ${shrink} 2s ease-out 0s 1 forwards;
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

class Fili extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      mouseDown: false,
      dragging: false,
      bouncing: false
    }
  }

  componentDidMount () {
    this.$el = jQuery(this.el)
    this.fili = this.filiInit()
  }

  onMouseEnter = () => {
    if (!this.state.dragging) {
      this.filiTakeCover()
      this.setState({
        cursor: `url(${cursorGrab}), auto`
      })
    }
  }

  onMouseOut = () => {
    if (!this.state.dragging) {
      this.filiStand()
    }
  }

  onMouseDown = (event) => {
    if (event.button === LEFT_BUTTON) {
      event.stopPropagation()
      this.addEvents()
      const pageOffset = this.el.getBoundingClientRect()
      const parentOffset = document.getElementById('devices').getBoundingClientRect()
      this.setState({
        mouseDown: true,
        width: pageOffset.width,
        height: pageOffset.height,
        originX: event.pageX,
        originY: event.pageY,
        elementX: pageOffset.left,
        elementY: pageOffset.top,
        parentOffsetX: parentOffset.left,
        parentOffsetY: parentOffset.top,
        lastMoves: [],
        cursor: `url(${cursorGrabbing}), auto`
      })
    }
  }

  onMouseMove = (event) => {
    const deltaX = event.pageX - this.state.originX
    const deltaY = event.pageY - this.state.originY
    const distance = Math.abs(deltaX) + Math.abs(deltaY)

    if (!this.state.dragging && distance > DRAG_THRESHOLD) {
      this.setState({dragging: true})
      this.filiStruggle()
      this.props.isDragging(true)
    }

    if (this.state.dragging) {
      // Drag with mouse but keep viewport constrains
      const pageWidth = document.documentElement.clientWidth
      const pageHeight = document.documentElement.clientHeight
      let left = this.state.elementX + deltaX + document.body.scrollLeft
      if (left < 0) left = 0
      if (left > pageWidth - this.state.width) left = pageWidth - this.state.width

      let top = this.state.elementY + deltaY + document.body.scrollTop
      if (top < 0) top = 0
      if (top > pageHeight - this.state.height) top = pageHeight - this.state.height

      // Collect last moves for bounce effect
      const lastMoves = this.state.lastMoves
      lastMoves.push([deltaX, deltaY])
      if (lastMoves.length > 10) lastMoves.shift()

      this.setState({
        left: left - this.state.parentOffsetX,
        top: top - this.state.parentOffsetY,
        lastMoves
      })
    }
  }

  onMouseUp = (event) => {
    this.removeEvents()

    if (this.calcInDevice(event.clientX, event.clientY)) {

      this.filiShrink()

    } else {
      if (this.state.dragging) {
        this.props.isDragging(false)
        this.setState({
          dragging: false,
          cursor: `url(${cursorGrab}), auto`
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
          this.fili.showSprite(5)
        }
      }
    }
  }

  addEvents = () => {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.body.style.userSelect = 'none'
    document.body.style.overflowX = 'hidden'
  }

  removeEvents = () => {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.body.style.userSelect = 'auto'
    document.body.style.overflowX = 'auto'
  }

  calcInDevice = (x, y) => {
    let inDevice = false
    const devices = document.getElementsByClassName('static')
    for (let device of devices) {
      const pos = {
        top: device.offsetTop + this.state.parentOffsetY,
        left: device.offsetLeft + this.state.parentOffsetX,
        width: device.offsetWidth,
        height: device.offsetHeight,
      }

      if (
        x > pos.left && x < pos.left + pos.width &&
        y > pos.top && y < pos.top + pos.height
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
      rows: 3,
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
    if (!this.state.dragging && !this.state.bouncing) {
      this.fili.play({
        run: 1,
        delay: 20,
        script: 'stand'
      })
    }
  }

  filiTakeCover = () => {
    this.fili.play({
      run: 1,
      delay: 20,
      script: 'take-cover'
    })
  }

  filiStruggle = () => {
    this.fili.play({
      run: -1,
      delay: 100,
      script: 'struggle'
    })
  }

  filiBounce = (bounceX, bounceY, duration) => {
    this.setState({
      bouncing: true
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
        this.setState({
          bouncing: false
        })
        setTimeout(this.filiStand, 200)
      }
    })
  }

  filiShrink = () => {
    this.$el.addClass('shrink')

    setTimeout(() => {
      this.props.isDragging(false)
      this.el.remove()
      jQuery('#page-static-overlay').show()

      // Redirect to galaxy.fili.nl
      setTimeout(() => {
        window.location = 'https://galaxy.fili.nl'
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
        className='fili'
        style={{
          position: this.state.position,
          top: this.state.top,
          left: this.state.left,
          cursor: this.state.cursor
        }}
      />
    </Wrapper>
  }
}

Fili.propTypes = {
  isDragging: PropTypes.func
}

export default Fili
