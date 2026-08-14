import {
  mockDatabase,
  generateMockId,
  validateStudentCode
} from '../data/mockData.js'

// Simular delays de red
const networkDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
  // AUTH SERVICES
  auth: {
    // ACTUALIZAR la función studentLogin en mockApi.js:
    async studentLogin(accessCode) {
      console.log('🔍 MockAPI: Intentando login con código:', accessCode);
      await networkDelay(800)

      // Simular diferentes escenarios de error
      if (accessCode === 'MANTENIMIENTO') {
        throw new Error('El sistema está temporalmente en mantenimiento. Por favor intenta más tarde.');
      }

      if (accessCode === 'CONEXION') {
        throw new Error('No se pudo establecer conexión con el servidor. Verifica tu conexión a internet.');
      }

      if (validateStudentCode(accessCode)) {
        const sessionId = `student_${generateMockId()}`
        const session = {
          id: sessionId,
          userType: 'student',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }

        // Simular guardar sesión
        mockDatabase.sessions.push(session)
        localStorage.setItem('cms_session', JSON.stringify(session))

        return {
          success: true,
          sessionId,
          userType: 'student',
          message: 'Acceso autorizado'
        }
      }

      throw new Error('Código de acceso inválido. Por favor verifica tu código e intenta nuevamente.');
    },

    // async adminLogin(username, password) {
    //   await networkDelay(500)

    //   const user = findUserByCredentials(username, password)
    //   if (user) {
    //     const sessionId = `admin_${generateMockId()}`
    //     const session = {
    //       id: sessionId,
    //       userType: 'admin',
    //       userId: user.id,
    //       role: user.role,
    //       permissions: user.permissions,
    //       createdAt: new Date().toISOString(),
    //       expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
    //     }

    //     mockDatabase.sessions.push(session)
    //     localStorage.setItem('cms_session', JSON.stringify(session))

    //     return {
    //       success: true,
    //       sessionId,
    //       userType: 'admin',
    //       role: user.role,
    //       permissions: user.permissions,
    //       user: {
    //         id: user.id,
    //         username: user.username,
    //         fullName: user.fullName,
    //         email: user.email
    //       }
    //     }
    //   }

    //   throw new Error('Credenciales inválidas')
    // },

    async logout() {
      await networkDelay(200)
      localStorage.removeItem('cms_session')
      return { success: true }
    },

    async verify() {
      await networkDelay(100)
      const session = JSON.parse(localStorage.getItem('cms_session') || 'null')

      if (session && new Date(session.expiresAt) > new Date()) {
        return {
          valid: true,
          session
        }
      }

      return { valid: false }
    }
  },

  // CONTENT SERVICES
  content: {
    async get(section) {
      await networkDelay(300)
      return mockDatabase.content[section] || null
    },

    async getById(section, id) {
      await networkDelay(200)
      const content = mockDatabase.content[section]
      return content?.blocks.find(block => block.id === parseInt(id)) || null
    },

    async create(section, data) {
      await networkDelay(500)
      const newBlock = {
        id: generateMockId(),
        ...data,
        order: (mockDatabase.content[section]?.blocks.length || 0) + 1
      }

      if (!mockDatabase.content[section]) {
        mockDatabase.content[section] = {
          id: section,
          title: section.charAt(0).toUpperCase() + section.slice(1),
          blocks: [],
          lastUpdated: new Date().toISOString(),
          status: "draft"
        }
      }

      mockDatabase.content[section].blocks.push(newBlock)
      mockDatabase.content[section].lastUpdated = new Date().toISOString()

      return newBlock
    },

    async update(section, id, data) {
      await networkDelay(400)
      const content = mockDatabase.content[section]
      const blockIndex = content?.blocks.findIndex(block => block.id === parseInt(id))

      if (blockIndex !== -1) {
        mockDatabase.content[section].blocks[blockIndex] = {
          ...mockDatabase.content[section].blocks[blockIndex],
          ...data
        }
        mockDatabase.content[section].lastUpdated = new Date().toISOString()

        return mockDatabase.content[section].blocks[blockIndex]
      }

      throw new Error('Block not found')
    },

    async delete(section, id) {
      await networkDelay(300)
      const content = mockDatabase.content[section]
      const blockIndex = content?.blocks.findIndex(block => block.id === parseInt(id))

      if (blockIndex !== -1) {
        const deleted = mockDatabase.content[section].blocks.splice(blockIndex, 1)
        mockDatabase.content[section].lastUpdated = new Date().toISOString()
        return deleted[0]
      }

      throw new Error('Block not found')
    }
  },

  // FILE SERVICES (simulado)
  files: {
    async upload(file) {
      await networkDelay(1000) // Simular upload lento

      // Simular URL del archivo subido
      const mockUrl = `/uploads/${generateMockId()}_${file.name}`

      return {
        success: true,
        url: mockUrl,
        filename: file.name,
        size: file.size,
        type: file.type
      }
    },

    async delete() {
      await networkDelay(300)
      return { success: true }
    }
  },

  // ADMIN SERVICES
  admin: {
    async getUsers() {
      await networkDelay(300)
      return mockDatabase.users.map(user => ({
        ...user,
        password: undefined // No enviar passwords
      }))
    },

    async createUser(userData) {
      await networkDelay(500)
      const newUser = {
        id: generateMockId(),
        ...userData,
        createdAt: new Date().toISOString()
      }

      mockDatabase.users.push(newUser)
      return { ...newUser, password: undefined }
    },

    async updateUser(id, userData) {
      await networkDelay(400)
      const userIndex = mockDatabase.users.findIndex(user => user.id === parseInt(id))

      if (userIndex !== -1) {
        mockDatabase.users[userIndex] = {
          ...mockDatabase.users[userIndex],
          ...userData,
          updatedAt: new Date().toISOString()
        }

        const updated = { ...mockDatabase.users[userIndex] }
        delete updated.password
        return updated
      }

      throw new Error('User not found')
    },

    async deleteUser(id) {
      await networkDelay(300)
      const userIndex = mockDatabase.users.findIndex(user => user.id === parseInt(id))

      if (userIndex !== -1) {
        mockDatabase.users.splice(userIndex, 1)
        return { success: true }
      }

      throw new Error('User not found')
    }
  }
}