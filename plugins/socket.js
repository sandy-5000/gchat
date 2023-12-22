import io from 'socket.io-client'

export default defineNuxtPlugin(nuxtApp => {
    const socket = io('http://0.0.0.0:3000')
    nuxtApp.provide('socket', socket)
})