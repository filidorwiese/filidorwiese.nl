import Velocity from 'velocity-animate'

let baseEasings = {}

baseEasings.Bounce = p => {
  let pow2
  let bounce = 4
  while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}

  return 1 / Math.pow(4, 3 - bounce) - 7.5625 *
    Math.pow((pow2 * 3 - 2) / 22 - p, 2)
}

Velocity.Easings.easeOutBounce = p => 1 - baseEasings.Bounce(1 - p)

export default Velocity