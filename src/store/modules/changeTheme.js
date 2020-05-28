import {
    setStorage,
    getStorage
} from '@/utils/storage'

const changeTheme = {
    state: {
        theme: getStorage({
            name: 'theme'
        }) || '#409EFF',
    },
    mutations: {
        SET_THEME: (state, color) => {
            state.theme = color
            setStorage({
                name: 'theme',
                content: state.theme
            })
        },
    }
}
export default changeTheme