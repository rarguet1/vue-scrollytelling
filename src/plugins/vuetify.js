// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light', // Ensure you set a default theme
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.pink.darken4, // #E53935
          secondary: colors.pink.lighten4, // #FFCDD2
          // Add more colors as needed
          accent: colors.pink.base, // #3F51B5
        }
      }
    }
  }
})
