
module.exports = {
  // mode: 'jit',
  purge: {
    enabled: true,
    preserveHtmlElements: false,
    layers: ['components', 'utilities'],
    content: ['./src/**/*.{html,ts}'],
    options: {
      keyframes: true,
    }
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    height: {
      '705': '705px',      
      '660': '660px',
      '530': '530px',
      '322': '322px',
      '321': '321px',
      '343': '343px',
      '197': '197px',
      '146': '146px',
      '52': '52px',
      '41': '40px',
    },
    extend: {
        width: {
          '1275': '1275px',
          '1244': '1244px',
          '1224': '1224px',
          '1048': '1048px',
          '1330': '1330px',
          '681': '681px',
          '500': '500px',
          '480': '480px',
          '474': '474px',
          '375': '375px',
          '343': '343px',
          '336': '336px',
          '311': '311px',
          '326': '326px',
          '307': '307px',
          '290': '290px',
          '280': '280px',
          '270': '270px',                                        
        },     
      colors: {
        gold: '#fcc604',
        placeholder: '#fafafa',
        bluey_grey: '#92949b',
        placeholder: '#bdbdbd',
        greyish_brown: '#4f4f4f',
        terang: '#efeffe',
        gelap: '#000000',
        gelapbaru: '#1b1c20'
      },
      fontFamily: {
        poppins: ['"Poppins"', 'cursive'],
      },
      fontSize: {
        'xs-9': '9px',
        'xs-10': '10px',
        'md-12': '12px',
        'md-13': '13px',
        'md-14': '14px',
        'md-16': '16px',
        'md-18': '18px',
        'md-20': '20px',
        'md-28': '28px',
        'md-20': '20px',
        'md-24': '24px',
        'md-32': '32px',
        'md-34': '34px',
        'md-62': '62px',
      },
      backgroundColor: theme => ({
        'gold': '#fcc604',
        'terang': '#efeffe',
        'gelap': '#000000',
        'gelapbaru': '#1b1c20'
      }),
      borderColor: theme => ({
        'placeholder': '#bdbdbd'
      }),
      gridTemplateColumns: {
        'paket': '474px minmax(0, 1fr)',
        'program': '546px minmax(0, 1fr)',
      },
      spacing: {
        md: '46px',
        sm: '20px',
      },
      boxShadow: {
        'md-A': 'box-shadow: 0 3px 5px 0 rgba(176, 190, 197, 0.32), 0 8px 24px 0 rgba(176, 190, 197, 0.32)'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')
    , require('@tailwindcss/forms')
    , require('@tailwindcss/line-clamp')
    , require('@tailwindcss/typography')
  ],
};
