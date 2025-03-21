import { APIService } from '@repo/api-service'
import { putToast } from '@repo/widgets'

class APIAppTodo extends APIService<{}> {
  constructor() {
    super('/todo')
  }

  // async login(data: AuthData) {
  //   try {
  //     const response = await this.post('/login', data)
  //     if (response?.token) {
  //       this.instance.setToken(response.token)
  //     }
  //     return response
  //   } catch (err) {
  //     putToast('error', 'Auth error', 'Oooooooops', 3000)
  //     // ('error', 'Auth error', 'Oooooooops', 3000)
  //     throw err
  //   }
  // }
}

export const APIAppTodoService = new APIAppTodo()
