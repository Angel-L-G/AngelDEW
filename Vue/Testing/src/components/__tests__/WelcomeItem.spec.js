import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WelcomeItem from '@/components/WelcomeItem.vue'

describe('WelcomeItem', () => {
    it('renders icon slot correctly', () => {
        const wrapper = mount(WelcomeItem, {
            slots: {
                icon: '<span class="test-icon">Icon</span>',
            },
        })

        expect(wrapper.find('.test-icon').exists()).toBe(true)
        expect(wrapper.text()).toContain('Icon')
    })

    it('renders heading slot correctly', () => {
        const wrapper = mount(WelcomeItem, {
            slots: {
                heading: 'Item Heading',
            },
        })

        expect(wrapper.find('h3').text()).toBe('Item Heading')
    })

    it('renders default slot content correctly', () => {
        const wrapper = mount(WelcomeItem, {
            slots: {
                default: 'This is some default content',
            },
        })

        expect(wrapper.text()).toContain('This is some default content')
    })
})

describe('WelcomeItem', () => {
    it('applies the correct classes to elements', () => {
        const wrapper = mount(WelcomeItem, {
            slots: {
                icon: '<span class="test-icon">Icon</span>',
                heading: 'Item Heading',
                default: 'This is some default content',
            },
        })

        expect(wrapper.classes()).toContain('item')
        expect(wrapper.find('.details').exists()).toBe(true)
    })
})
