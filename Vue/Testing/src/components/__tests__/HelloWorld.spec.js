import { describe, it, expect } from "vitest";
import HelloWorld from "../HelloWorld.vue";
import { mount } from '@vue/test-utils'

describe('HelloWorld', () => {
    it('renders the msg prop correctly', () => {
        const wrapper = mount(HelloWorld, {
            props: {
                msg: 'Hello Vitest!',
            },
        })

        expect(wrapper.text()).toContain('Hello Vitest!')
    })
})

describe('HelloWorld', () => {
    it('renders the links correctly', () => {
        const wrapper = mount(HelloWorld, {
            props: {
                msg: 'Hello Vitest!',
            },
        })

        const viteLink = wrapper.find('a[href="https://vite.dev/"]')
        const vueLink = wrapper.find('a[href="https://vuejs.org/"]')

        expect(viteLink.exists()).toBe(true)
        expect(viteLink.attributes('target')).toBe('_blank')
        expect(viteLink.attributes('rel')).toBe('noopener')

        expect(vueLink.exists()).toBe(true)
        expect(vueLink.attributes('target')).toBe('_blank')
        expect(vueLink.attributes('rel')).toBe('noopener')
    })
})

