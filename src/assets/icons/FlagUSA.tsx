import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { SvgIconProps } from 'types/ui'

function FlagUSA({ ...props }: SvgIconProps & SvgProps) {
  return (
    <Svg
      width={30}
      height={30}
      fill="none"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23 2.308H7A14.904 14.904 0 0 1 14.742 0h.516A14.906 14.906 0 0 1 23 2.307Z"
        fill="#DB1B1B"
      />
      <Path
        d="M25.826 4.615H4.174l.044-.045c.273-.281.555-.551.846-.81.28-.248.57-.485.868-.712.345-.262.703-.51 1.068-.74h16a15.005 15.005 0 0 1 2.826 2.307Z"
        fill="#fff"
      />
      <Path
        d="M27.643 6.922H2.357a14.98 14.98 0 0 1 1.817-2.307h21.652a15.11 15.11 0 0 1 1.817 2.307Z"
        fill="#DB1B1B"
      />
      <Path
        d="M28.85 9.23H1.15a15 15 0 0 1 1.092-2.124l.117-.184h25.284c.469.733.873 1.505 1.207 2.307Z"
        fill="#fff"
      />
      <Path
        d="M29.598 11.536H.402c.084-.357.181-.709.293-1.054.134-.427.286-.844.457-1.252H28.85c.312.747.562 1.518.748 2.306Z"
        fill="#DB1B1B"
      />
      <Path
        d="M29.956 13.844H.044a14.88 14.88 0 0 1 .358-2.308h29.196c.18.759.3 1.53.358 2.308Z"
        fill="#fff"
      />
      <Path
        d="M30 14.997c0 .388-.015.773-.044 1.154H.044c-.03-.38-.044-.765-.044-1.154v-.747c0 .02.006.039.016.055 0-.04.003-.08.006-.12.006-.115.013-.228.022-.341h29.912c.03.38.044.765.044 1.153Z"
        fill="#DB1B1B"
      />
      <Path
        d="M29.956 16.151a14.867 14.867 0 0 1-.358 2.308H.402c-.18-.76-.3-1.53-.358-2.308h29.912Z"
        fill="#fff"
      />
      <Path
        d="M29.598 18.459c-.185.788-.435 1.56-.748 2.306H1.15a14.75 14.75 0 0 1-.748-2.306h29.196Z"
        fill="#DB1B1B"
      />
      <Path
        d="M28.85 20.765a14.89 14.89 0 0 1-1.207 2.308H2.357a14.886 14.886 0 0 1-1.207-2.308h27.7Z"
        fill="#fff"
      />
      <Path
        d="M27.643 23.073c-.53.826-1.138 1.599-1.817 2.307H4.174a15.083 15.083 0 0 1-1.816-2.307h25.285Z"
        fill="#DB1B1B"
      />
      <Path
        d="M25.826 25.38A15.073 15.073 0 0 1 23 27.688H7a15.07 15.07 0 0 1-2.826-2.308h21.652Z"
        fill="#fff"
      />
      <Path
        d="M23 27.688a14.908 14.908 0 0 1-7.707 2.31h-.586a14.909 14.909 0 0 1-7.71-2.307L23 27.688Z"
        fill="#DB1B1B"
      />
      <Path
        d="M16.113.038v16.113H.043C.016 15.771 0 15.385 0 14.997v-.747c0 .02.006.039.016.055 0-.04.003-.08.006-.12a14.883 14.883 0 0 1 2.222-7.079l.117-.184c.214-.333.44-.659.68-.974.352-.466.73-.911 1.133-1.333l.044-.045c.273-.282.555-.552.846-.81.28-.248.57-.485.868-.713a15.463 15.463 0 0 1 1.943-1.252A14.904 14.904 0 0 1 14.742 0h.516c.288.004.572.018.855.038Z"
        fill="#3E436D"
      />
      <Path
        d="m14.379.958.205.631a.107.107 0 0 0 .101.074h.667a.107.107 0 0 1 .096.14.106.106 0 0 1-.038.053l-.537.39a.105.105 0 0 0-.039.117l.205.632a.107.107 0 0 1-.164.117l-.537-.39a.107.107 0 0 0-.125 0l-.537.39a.106.106 0 0 1-.164-.117l.205-.632a.107.107 0 0 0-.038-.117l-.538-.39a.107.107 0 0 1-.038-.12.106.106 0 0 1 .101-.073h.664a.107.107 0 0 0 .101-.074l.205-.63a.107.107 0 0 1 .205 0ZM7.255 2.308a.109.109 0 0 0 0 .058l.206.63a.107.107 0 0 1-.164.118l-.538-.39a.107.107 0 0 0-.124 0l-.538.39a.106.106 0 0 1-.167-.067 15.464 15.464 0 0 1 1.943-1.253.107.107 0 0 1-.042.058l-.537.39a.108.108 0 0 0-.039.066ZM14.379 5.87l.205.631a.106.106 0 0 0 .101.074h.666a.107.107 0 0 1 .063.192l-.537.39a.105.105 0 0 0-.039.118l.203.633a.107.107 0 0 1-.164.117l-.537-.39a.107.107 0 0 0-.125 0l-.537.39a.107.107 0 0 1-.165-.117l.206-.632a.107.107 0 0 0-.039-.117l-.537-.39a.108.108 0 0 1-.038-.12.106.106 0 0 1 .1-.073h.665a.107.107 0 0 0 .101-.074l.205-.631a.107.107 0 0 1 .164-.054.107.107 0 0 1 .039.053ZM10.59 5.87l.205.631a.106.106 0 0 0 .101.074h.664a.107.107 0 0 1 .063.192l-.538.39a.106.106 0 0 0-.038.118l.203.633a.106.106 0 0 1-.164.117l-.537-.39a.107.107 0 0 0-.125 0l-.536.39a.106.106 0 0 1-.163-.117l.205-.632a.106.106 0 0 0-.039-.117l-.537-.39a.107.107 0 0 1 .063-.193h.661a.106.106 0 0 0 .102-.074l.204-.631a.107.107 0 0 1 .167-.057.107.107 0 0 1 .039.056ZM4.043 6.768l-.213.154-.324.234a.107.107 0 0 0-.039.118l.207.634a.107.107 0 0 1-.164.117l-.537-.391a.107.107 0 0 0-.125 0l-.538.39a.107.107 0 0 1-.164-.116l.206-.632a.108.108 0 0 0-.039-.117l-.071-.052.117-.183c.214-.334.44-.66.68-.974l.178.551a.107.107 0 0 0 .101.074h.666a.107.107 0 0 1 .059.193ZM14.379 10.873l.205.632a.107.107 0 0 0 .101.073h.667a.106.106 0 0 1 .1.074.106.106 0 0 1-.038.119l-.537.39a.105.105 0 0 0-.039.117l.205.632a.107.107 0 0 1-.164.117l-.536-.39a.108.108 0 0 0-.126 0l-.537.39a.107.107 0 0 1-.163-.052.107.107 0 0 1-.001-.065l.206-.632a.107.107 0 0 0-.04-.117l-.537-.39a.107.107 0 0 1 .063-.193h.664a.107.107 0 0 0 .101-.073l.205-.632a.107.107 0 0 1 .2 0ZM10.59 10.873l.205.632a.106.106 0 0 0 .101.073h.664a.107.107 0 0 1 .063.193l-.538.39a.106.106 0 0 0-.038.117l.203.633a.106.106 0 0 1-.164.118l-.537-.39a.107.107 0 0 0-.125 0l-.538.39a.105.105 0 0 1-.123 0 .106.106 0 0 1-.04-.118l.205-.631a.106.106 0 0 0-.039-.117l-.537-.39a.107.107 0 0 1 .063-.193h.663a.106.106 0 0 0 .102-.074l.204-.631a.107.107 0 0 1 .102-.079.106.106 0 0 1 .104.077ZM6.8 10.873l.205.632a.107.107 0 0 0 .102.073h.664a.107.107 0 0 1 .062.193l-.537.39a.107.107 0 0 0-.039.117l.206.632a.107.107 0 0 1-.164.117l-.537-.39a.107.107 0 0 0-.125 0l-.537.39a.107.107 0 0 1-.163-.052.107.107 0 0 1-.001-.065l.205-.632a.105.105 0 0 0-.039-.117l-.536-.39a.106.106 0 0 1 .059-.193h.664a.106.106 0 0 0 .101-.073l.205-.632a.107.107 0 0 1 .205 0ZM3.012 10.873l.205.632a.106.106 0 0 0 .101.073h.666a.107.107 0 0 1 .059.193l-.537.39a.105.105 0 0 0-.039.117l.205.632a.107.107 0 0 1-.164.117l-.537-.39a.108.108 0 0 0-.125 0l-.537.39a.107.107 0 0 1-.163-.052.107.107 0 0 1-.001-.065l.205-.632a.107.107 0 0 0-.038-.117l-.538-.39a.106.106 0 0 1 .063-.193h.666a.106.106 0 0 0 .1-.073l.206-.632a.106.106 0 0 1 .203 0ZM12.484 3.273l.205.632a.106.106 0 0 0 .101.073h.664a.107.107 0 0 1 .063.193l-.537.39a.107.107 0 0 0-.039.117l.206.632a.107.107 0 0 1-.164.117l-.538-.39a.107.107 0 0 0-.125 0l-.537.39a.107.107 0 0 1-.164-.117l.205-.632a.106.106 0 0 0-.038-.117l-.536-.39a.107.107 0 0 1-.04-.117.107.107 0 0 1 .099-.076h.664a.106.106 0 0 0 .1-.073l.206-.632a.107.107 0 0 1 .205 0ZM5.363 4.615a.109.109 0 0 0 0 .066l.203.63a.107.107 0 0 1-.163.118l-.537-.39a.107.107 0 0 0-.126 0l-.537.39a.107.107 0 0 1-.164-.117l.206-.631a.109.109 0 0 0 0-.066.097.097 0 0 0-.026-.047c.273-.282.555-.552.846-.81l.047.144a.107.107 0 0 0 .103.076h.664a.107.107 0 0 1 .062.194l-.537.39a.105.105 0 0 0-.04.053ZM2.356 9.23a.101.101 0 0 1-.043.073l-.538.39a.107.107 0 0 0-.038.118l.205.631a.106.106 0 0 1-.164.117l-.537-.39a.104.104 0 0 0-.125 0l-.423.308a14.464 14.464 0 0 1 .686-1.771l.106.327a.107.107 0 0 0 .101.075h.664a.107.107 0 0 1 .106.121ZM12.484 8.406l.205.631a.107.107 0 0 0 .101.073h.664a.107.107 0 0 1 .063.193l-.537.39a.107.107 0 0 0-.039.118l.206.631a.107.107 0 0 1-.164.117l-.538-.39a.106.106 0 0 0-.125 0l-.537.39a.106.106 0 0 1-.124 0 .108.108 0 0 1-.04-.117l.205-.631a.105.105 0 0 0-.038-.118l-.536-.39a.106.106 0 0 1 .063-.193h.664a.107.107 0 0 0 .1-.073l.206-.631a.107.107 0 0 1 .201 0ZM8.695 8.406l.205.631a.107.107 0 0 0 .102.073h.666a.107.107 0 0 1 .063.193l-.538.39a.105.105 0 0 0-.038.118l.205.631a.107.107 0 0 1-.164.117l-.537-.39a.107.107 0 0 0-.125 0l-.538.39a.107.107 0 0 1-.162-.052.107.107 0 0 1-.002-.065l.206-.631a.107.107 0 0 0-.039-.118l-.537-.39a.107.107 0 0 1 .063-.193h.663a.107.107 0 0 0 .102-.073l.205-.631a.107.107 0 0 1 .2 0ZM1.775 14.726a.106.106 0 0 0-.038.117l.205.633a.106.106 0 0 1-.164.117l-.537-.39a.106.106 0 0 0-.125 0l-.537.392a.106.106 0 0 1-.164-.117l.205-.632a.105.105 0 0 0-.039-.118l-.537-.393a.105.105 0 0 1-.028-.03c0-.04.003-.08.006-.12a.102.102 0 0 1 .085-.042H.77a.107.107 0 0 0 .102-.074l.073-.225.132-.406a.107.107 0 0 1 .203 0l.132.406.073.225a.107.107 0 0 0 .101.074h.664a.106.106 0 0 1 .102.14.106.106 0 0 1-.04.052l-.537.391ZM12.484 13.438l.205.631a.107.107 0 0 0 .101.073h.664a.107.107 0 0 1 .063.193l-.537.39a.108.108 0 0 0-.039.118l.206.63a.107.107 0 0 1-.164.118l-.538-.39a.107.107 0 0 0-.125 0l-.537.39a.107.107 0 0 1-.164-.117l.205-.631a.107.107 0 0 0-.038-.117l-.536-.39a.106.106 0 0 1 .063-.194h.664a.106.106 0 0 0 .1-.073l.206-.631a.107.107 0 0 1 .201 0ZM8.695 13.438l.205.631a.106.106 0 0 0 .102.073h.666a.107.107 0 0 1 .098.076.107.107 0 0 1-.04.117l-.537.39a.106.106 0 0 0-.038.118l.205.63a.107.107 0 0 1-.164.118l-.537-.39a.107.107 0 0 0-.125 0l-.538.39a.107.107 0 0 1-.164-.117l.206-.631a.108.108 0 0 0-.039-.117l-.537-.39a.107.107 0 0 1 .063-.194h.663a.107.107 0 0 0 .102-.073l.205-.631a.106.106 0 0 1 .204 0ZM4.906 13.438l.205.631a.106.106 0 0 0 .104.073h.664a.107.107 0 0 1 .062.193l-.537.39a.107.107 0 0 0-.039.118l.201.633a.106.106 0 0 1-.163.117l-.537-.39a.108.108 0 0 0-.126 0l-.537.39a.107.107 0 0 1-.124 0 .106.106 0 0 1-.04-.117l.206-.631a.107.107 0 0 0-.04-.117l-.536-.39a.106.106 0 0 1 .062-.193h.663a.106.106 0 0 0 .102-.073l.205-.632a.106.106 0 0 1 .166-.058.106.106 0 0 1 .039.056Z"
        fill="#fff"
      />
      <Path
        d="M16.816.106a14.866 14.866 0 0 0-5.165 1.609l-.15.08a14.8 14.8 0 0 0-.875.513H7A14.904 14.904 0 0 1 14.742 0h.516a14.732 14.732 0 0 1 1.558.105Z"
        fill="#DB1B1B"
      />
      <Path
        d="M10.626 2.308a13.874 13.874 0 0 0-1.068.74A14.942 14.942 0 0 0 7.912 4.5l.085.059a.105.105 0 0 1 .039.054H4.174l.044-.045c.273-.282.555-.552.846-.81.28-.248.57-.485.868-.713.345-.26.703-.509 1.068-.74l3.626.003Z"
        fill="#fff"
      />
      <Path
        d="M7.8 4.615c-.366.382-.712.783-1.037 1.202l-.1.131c-.054.072-.108.144-.161.218l-.11.335a.107.107 0 0 1-.1.074H6.21c-.079.117-.155.231-.23.348H2.357a14.98 14.98 0 0 1 1.817-2.308h3.627Z"
        fill="#DB1B1B"
      />
      <Path
        d="m5.984 6.922-.065.103-.05.08A14.998 14.998 0 0 0 4.775 9.23H1.15a15 15 0 0 1 1.092-2.124l.117-.184 3.625.001Z"
        fill="#fff"
      />
      <Path
        d="M4.776 9.23c-.17.407-.323.824-.457 1.25-.11.346-.207.698-.293 1.054H.402c.084-.357.181-.709.293-1.054.134-.427.286-.844.457-1.252l3.624.001Z"
        fill="#DB1B1B"
      />
      <Path
        d="m4.043 11.77-.083.06a14.875 14.875 0 0 0-.293 2.012H.044c.059-.777.178-1.548.358-2.307h3.626l-.01.047a.107.107 0 0 1 .025.189Z"
        fill="#fff"
      />
      <Path
        d="M3.626 14.997c0 .388.015.773.044 1.154H.044c-.03-.38-.044-.765-.044-1.154v-.747c0 .02.006.039.016.055 0-.04.003-.08.006-.12.006-.115.013-.228.022-.341H3.67a13.11 13.11 0 0 0-.022.34c0 .04-.004.081-.006.121a.088.088 0 0 1-.012-.026c0-.005 0-.01-.002-.015v-.014l-.002.747Z"
        fill="#DB1B1B"
      />
      <Path
        d="M4.028 18.459H.402c-.18-.76-.3-1.53-.358-2.308H3.67c.059.777.179 1.549.358 2.308Z"
        fill="#AAA"
      />
      <Path
        d="M4.776 20.765H1.15a14.75 14.75 0 0 1-.748-2.306h3.626c.186.788.436 1.56.748 2.306Z"
        fill="#C11A1A"
      />
      <Path
        d="M5.984 23.073H2.357a14.886 14.886 0 0 1-1.207-2.308h3.626c.334.803.738 1.575 1.208 2.308Z"
        fill="#AAA"
      />
      <Path
        d="M7.8 25.38H4.175a15.083 15.083 0 0 1-1.816-2.307h3.626c.53.826 1.137 1.599 1.817 2.307Z"
        fill="#C11A1A"
      />
      <Path
        d="M10.626 27.688H7a15.07 15.07 0 0 1-2.826-2.308h3.627c.844.88 1.793 1.656 2.825 2.308Z"
        fill="#AAA"
      />
      <Path
        d="M16.816 29.888c-.505.063-1.014.1-1.523.11h-.586a14.909 14.909 0 0 1-7.71-2.307h3.627a14.891 14.891 0 0 0 6.192 2.197Z"
        fill="#C11A1A"
      />
      <Path
        d="M16.113.038v.169a14.866 14.866 0 0 0-4.462 1.508l-.15.08A14.73 14.73 0 0 0 9.756 2.9l-.198.147A14.946 14.946 0 0 0 7.912 4.5l.085.059a.105.105 0 0 1 .039.053H7.8c-.366.383-.713.784-1.037 1.202l-.1.132c-.055.072-.109.144-.162.217l-.11.338a.107.107 0 0 1-.1.074H6.21c-.079.117-.155.23-.23.347l-.064.103-.051.08a15.001 15.001 0 0 0-1.84 4.43l-.011.047a.107.107 0 0 1 .07.085.106.106 0 0 1-.043.102l-.082.058a14.876 14.876 0 0 0-.315 2.354c0 .04-.005.08-.006.121a.087.087 0 0 1-.012-.026c0-.005 0-.01-.003-.015v-.014.75c0 .388.015.773.044 1.154H.044C.014 15.77 0 15.385 0 14.997v-.747c0 .02.006.039.016.055 0-.04.003-.08.006-.12a14.883 14.883 0 0 1 2.222-7.079l.117-.184c.214-.333.44-.659.68-.974.352-.466.73-.911 1.133-1.333l.044-.045c.273-.282.555-.552.846-.81.28-.248.57-.485.868-.713a15.463 15.463 0 0 1 1.943-1.252A14.904 14.904 0 0 1 14.742 0h.516c.288.004.572.018.855.038Z"
        fill="#32314B"
      />
      <Path
        d="M7.255 2.308a.109.109 0 0 0 0 .058l.206.63a.107.107 0 0 1-.164.118l-.538-.39a.107.107 0 0 0-.124 0l-.538.39a.106.106 0 0 1-.167-.067 15.464 15.464 0 0 1 1.943-1.253.107.107 0 0 1-.042.058l-.537.39a.108.108 0 0 0-.039.066ZM6.763 5.817l-.1.131c-.054.072-.108.144-.161.218l.096-.293a.107.107 0 0 1 .165-.056ZM4.043 6.768l-.213.154-.324.234a.107.107 0 0 0-.039.118l.207.634a.107.107 0 0 1-.164.117l-.537-.391a.107.107 0 0 0-.125 0l-.538.39a.107.107 0 0 1-.164-.116l.206-.632a.108.108 0 0 0-.039-.117l-.071-.052.117-.183c.214-.334.44-.66.68-.974l.178.551a.107.107 0 0 0 .101.074h.666a.107.107 0 0 1 .059.193ZM4.043 11.77l-.083.06-.454.33a.105.105 0 0 0-.039.117l.205.632a.107.107 0 0 1-.164.117l-.537-.39a.107.107 0 0 0-.125 0l-.537.39a.106.106 0 0 1-.124 0 .107.107 0 0 1-.04-.117l.205-.632a.106.106 0 0 0-.038-.117l-.538-.39a.107.107 0 0 1 0-.173.107.107 0 0 1 .063-.02h.666a.107.107 0 0 0 .1-.074l.206-.631a.106.106 0 0 1 .203 0l.205.63a.107.107 0 0 0 .101.074h.666a.11.11 0 0 1 .036.006.107.107 0 0 1 .06.144.106.106 0 0 1-.037.045ZM5.363 4.615a.109.109 0 0 0 0 .066l.203.63a.107.107 0 0 1-.163.118l-.537-.39a.107.107 0 0 0-.126 0l-.537.39a.107.107 0 0 1-.164-.117l.206-.631a.109.109 0 0 0 0-.066.097.097 0 0 0-.026-.047c.273-.282.555-.552.846-.81l.047.144a.107.107 0 0 0 .103.076h.664a.107.107 0 0 1 .062.194l-.537.39a.105.105 0 0 0-.04.053ZM2.356 9.23a.101.101 0 0 1-.043.073l-.538.39a.107.107 0 0 0-.038.118l.205.631a.106.106 0 0 1-.164.117l-.537-.39a.104.104 0 0 0-.125 0l-.423.308a14.464 14.464 0 0 1 .686-1.771l.106.327a.107.107 0 0 0 .101.075h.664a.107.107 0 0 1 .106.121ZM1.775 14.726a.106.106 0 0 0-.038.117l.205.633a.106.106 0 0 1-.164.117l-.537-.39a.106.106 0 0 0-.125 0l-.537.392a.106.106 0 0 1-.164-.117l.205-.632a.105.105 0 0 0-.039-.118l-.537-.393a.105.105 0 0 1-.028-.03c0-.04.003-.08.006-.12a.102.102 0 0 1 .085-.042H.77a.107.107 0 0 0 .102-.074l.073-.225.132-.406a.107.107 0 0 1 .203 0l.132.406.073.225a.107.107 0 0 0 .101.074h.664a.106.106 0 0 1 .102.14.106.106 0 0 1-.04.052l-.537.391Z"
        fill="#AAA"
      />
      <Path
        d="M3.626 14.25c0-.023.008-.046.022-.065 0 .04-.004.08-.006.12a.089.089 0 0 1-.012-.026c0-.005 0-.01-.002-.015a.108.108 0 0 1-.002-.014ZM4.906 8.406l.205.631a.107.107 0 0 0 .104.073h.664a.107.107 0 0 1 .062.193l-.537.39a.106.106 0 0 0-.039.118l.201.633a.106.106 0 0 1-.163.117l-.537-.39a.108.108 0 0 0-.126 0l-.537.39a.107.107 0 0 1-.124 0 .106.106 0 0 1-.04-.117l.206-.632a.106.106 0 0 0-.04-.117l-.536-.39a.107.107 0 0 1 .062-.193h.664a.107.107 0 0 0 .1-.073l.206-.632a.107.107 0 0 1 .205-.001Z"
        fill="#fff"
      />
      <Path
        d="M5.005 8.71a14.596 14.596 0 0 0-.686 1.77l-.114.082a.105.105 0 0 1-.124 0 .106.106 0 0 1-.04-.117l.205-.632a.106.106 0 0 0-.038-.117l-.538-.391a.101.101 0 0 1-.038-.117.107.107 0 0 1 .101-.073h.661a.107.107 0 0 0 .102-.075L4.7 8.41a.107.107 0 0 1 .203 0l.101.3Z"
        fill="#AAA"
      />
      <Path
        d="m6.8 5.87.205.631a.107.107 0 0 0 .102.074h.664a.107.107 0 0 1 .062.192l-.537.39a.107.107 0 0 0-.039.118l.206.633a.107.107 0 0 1-.164.117l-.537-.39a.107.107 0 0 0-.125 0l-.537.39a.107.107 0 0 1-.164-.117l.205-.632a.106.106 0 0 0-.039-.117l-.536-.392a.107.107 0 0 1 .059-.192h.664a.106.106 0 0 0 .104-.074l.205-.631a.107.107 0 0 1 .202 0Z"
        fill="#fff"
      />
      <Path
        d="M5.625 6.575h.586c-.079.117-.155.23-.23.347l-.064.103-.142-.103-.209-.154a.107.107 0 0 1 .059-.193Z"
        fill="#AAA"
      />
      <Path
        d="m8.695 3.273.205.632a.106.106 0 0 0 .102.073h.666a.107.107 0 0 1 .059.193l-.538.39a.106.106 0 0 0-.038.117l.205.632a.107.107 0 0 1-.164.117l-.537-.39a.107.107 0 0 0-.125 0l-.538.39a.107.107 0 0 1-.164-.117l.206-.632a.107.107 0 0 0-.039-.117l-.537-.39a.107.107 0 0 1 .063-.193h.663a.107.107 0 0 0 .102-.073l.205-.632a.107.107 0 0 1 .204 0Z"
        fill="#fff"
      />
      <Path
        d="M8.818 3.65a15.22 15.22 0 0 0-.905.85l-.453-.328a.107.107 0 0 1 .062-.194h.664a.107.107 0 0 0 .101-.074l.206-.63a.107.107 0 0 1 .202 0l.123.376Z"
        fill="#AAA"
      />
      <Path
        d="m10.59.958.205.631a.106.106 0 0 0 .104.074h.663a.107.107 0 0 1 .063.193l-.537.39a.106.106 0 0 0-.039.117l.201.634a.106.106 0 0 1-.101.137.106.106 0 0 1-.062-.02l-.538-.39a.107.107 0 0 0-.125 0l-.537.39a.106.106 0 0 1-.164-.117l.205-.632a.106.106 0 0 0-.039-.117l-.537-.39a.107.107 0 0 1 .063-.193h.663a.106.106 0 0 0 .102-.074l.205-.63a.107.107 0 0 1 .101-.08.107.107 0 0 1 .104.077Z"
        fill="#fff"
      />
      <Path
        d="m11.651 1.715-.15.08a14.736 14.736 0 0 0-1.745 1.106l.176-.535a.11.11 0 0 0 0-.059.107.107 0 0 0-.041-.062l-.538-.39a.106.106 0 0 1 .063-.192h.662a.106.106 0 0 0 .102-.074l.205-.632a.107.107 0 0 1 .202 0l.205.632a.106.106 0 0 0 .106.074h.664a.104.104 0 0 1 .09.052Z"
        fill="#AAA"
      />
      <Path
        d="M28.202 15.946a.954.954 0 1 0 0-1.908.954.954 0 0 0 0 1.908ZM26.215 15.668a.676.676 0 1 0 0-1.352.676.676 0 0 0 0 1.352Z"
        fill="#E54141"
      />
    </Svg>
  )
}

export default memo(FlagUSA)
