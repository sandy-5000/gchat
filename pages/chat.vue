<template>
  <div class=" p-0 m-0 h-screen bg-gray-900">
    <div class="h-[60px] px-3 py-2">
      <div
        class="h-full bg-gray-800 border-2 border-gray-700 hover:border-indigo-300 rounded-lg flex flex-col justify-center">
        <div class="flex px-10">
          <div class="mx-auto">
            <h1 class="text-lg font-semibold text-gray-300 text-center cursor-pointer">G-chat!
            </h1>
          </div>
          <div class="flex flex-col justify-center">
            <h1 class="text-sm font-semibold text-indigo-200 text-center cursor-pointer">Online: {{ online }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div style="height: calc(100% - 125px);" class="px-3 py-1 rounded-xl overflow-y-scroll">
      <ui-message>Hello guys, this is G-chat!</ui-message>
      <ui-message v-for="msg of messages">{{ msg }}</ui-message>
    </div>
    <form @submit.prevent="handleChatSubmit">
      <div class="h-[65px] py-2 px-3 relative">
        <input v-model="messageBox"
          class="outline-none border-2 border-gray-700 focus:border-indigo-600 px-3 pr-[100px] rounded-lg w-full h-full text-gray-100 bg-slate-800" />
        <div class="absolute h-full top-0 right-0 py-3 pr-4 flex flex-col justify-center">
          <button type="submit"
            class="outline-none bg-gray-900 text-gray-100 border-2 border-gray-700 hover:border-indigo-600 focus:border-indigo-600 rounded-lg h-full px-3">
            <icons-send></icons-send>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import io from 'socket.io-client'

const socket = io({
  path: '/api/socket.io/',
})

const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`

const messages = useState('messages', () => [])
const online = useState('online', () => 0)

socket.emit('connected', `Hello from ${id}`)

socket.on('online', (data) => {
  online.value = data.count
})

socket.on('broadcast', (data) => {
  while (messages.value.length > 200) {
    messages.value.shift()
  }
  messages.value.push(data.message)
})

const messageBox = ref('')

const handleChatSubmit = () => {
  socket.emit('message', {
    message: messageBox.value,
  })
  messageBox.value = ''
}
</script>