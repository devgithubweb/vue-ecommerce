import Vue from 'vue'
import Signup from '@/components/Account/Signup'

describe('Signup.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Signup)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h3').textContent)
      .to.equal('Sign up')
  })
})
