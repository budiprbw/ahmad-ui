module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {     
      width: {
        '1048': '1048px',      
        '474': '474px'  
      },
      height:{
        '660': '660px',        
        '530': '530px', 
        '322': '322px', 
      },
      colors:{
        gold: '#fcc604',
        placeholder:'#fafafa',
        bluey_grey:'#92949b',
        placeholder : '#bdbdbd',
        greyish_brown:'#4f4f4f',
        terang: '#efeffe',       
        gelap: '#000000',
        gelapbaru:'#1b1c20'
      },
      fontFamily:{
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
        'md-62': '62px',  
      },
      backgroundColor: theme=> ({
        'gold':'#fcc604',
        'terang': '#efeffe',
        'gelap': '#000000',
        'gelapbaru':'#1b1c20'
      }),
      borderColor : theme=> ({
        'placeholder':'#bdbdbd'
      }),
      gridTemplateColumns: {
        'paket': '474px minmax(0, 1fr)'
      },
      spacing: {
        md: '46px'
      },
      boxShadow: {
        'md-A':'box-shadow: 0 3px 5px 0 rgba(176, 190, 197, 0.32), 0 8px 24px 0 rgba(176, 190, 197, 0.32)'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')
,require('@tailwindcss/forms')
,require('@tailwindcss/line-clamp')
,require('@tailwindcss/typography')
],
};
