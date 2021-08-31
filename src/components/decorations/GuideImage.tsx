export default function GuideImage(props): JSX.Element {
  if (!props.isSmall) {
    return (
      <svg
        className={props.svgStyle}
        width='308'
        height='309'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill='#C4C4C4'
          d='M36 167.814L166.815 36.999 297.63 167.814 166.815 298.629z'
        />
        <g filter='url(#guide-avatar__filter0_d)'>
          <path
            fill='#2D2D2D'
            d='M33 168.35L167.35 34 301.7 168.35 167.35 302.7z'
          />
          <path
            stroke='#E6E2CF'
            d='M33.707 168.35L167.35 34.707 300.993 168.35 167.35 301.993z'
          />
        </g>
        <mask
          id='a'
          maskUnits='userSpaceOnUse'
          x='40'
          y='40'
          width='255'
          height='256'
        >
          <path
            transform='rotate(-45 40 168)'
            fill='#C4C4C4'
            d='M40 168h180v180H40z'
          />
        </mask>
        <g mask='url(#a)'>
          <path fill='url(#guide-avatar__pattern0)' d='M33 34h269v269H33z' />
        </g>
        <g filter='url(#guide-avatar__filter1_d)'>
          <path
            stroke='#E6E2CF'
            strokeWidth='2'
            d='M7.414 167.22l8.485-8.485 8.486 8.485-8.486 8.485z'
          />
        </g>
        <g filter='url(#guide-avatar__filter2_d)'>
          <path
            stroke='#E6E2CF'
            strokeWidth='2'
            d='M158.735 15.9l8.485-8.486 8.485 8.485-8.485 8.485z'
          />
        </g>
        <g filter='url(#guide-avatar__filter3_d)'>
          <path
            d='M24.385 158.735l134.35-134.35'
            stroke='#E6E2CF'
            strokeWidth='2'
          />
        </g>
        <defs>
          <filter
            id='guide-avatar__filter0_d'
            x='27'
            y='28'
            width='280.701'
            height='280.701'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1'
              operator='dilate'
              in='SourceAlpha'
              result='effect1_dropShadow'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='2.5' />
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='guide-avatar__filter1_d'
            x='0'
            y='151.321'
            width='31.799'
            height='31.799'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1'
              operator='dilate'
              in='SourceAlpha'
              result='effect1_dropShadow'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='2.5' />
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='guide-avatar__filter2_d'
            x='151.321'
            y='0'
            width='31.799'
            height='31.799'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1'
              operator='dilate'
              in='SourceAlpha'
              result='effect1_dropShadow'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='2.5' />
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='guide-avatar__filter3_d'
            x='17.678'
            y='17.678'
            width='147.764'
            height='147.764'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1'
              operator='dilate'
              in='SourceAlpha'
              result='effect1_dropShadow'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='2.5' />
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <pattern
            id='guide-avatar__pattern0'
            patternContentUnits='objectBoundingBox'
            width='1'
            height='1'
          >
            <use xlinkHref='#guide-avatar__image0' transform='scale(.00195)' />
          </pattern>
          <image
            id='guide-avatar__image0'
            x='0'
            y='0'
            width='512'
            height='512'
            preserveAspectRatio='xMidYMid slice'
            xlinkHref={
              props.image?.large?.url ??
              props.image?.small?.url ??
              props.image?.medium?.url ??
              props.image?.thumbnail?.url
            }
          />
        </defs>
      </svg>
    )
  } else {
    return (
      <svg
        className={props.svgStyle}
        width='153'
        height='153'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill='#C4C4C4'
          d='M20.305 82.899l62.377-62.167 62.377 62.167-62.377 62.167z'
        />
        <g filter='url(#guide-avatar1__filter0_d)'>
          <path
            fill='#2D2D2D'
            d='M18.874 83.153l64.063-63.847L147 83.153 82.937 147z'
          />
          <path
            stroke='#E6E2CF'
            d='M19.583 83.152l63.354-63.14 63.141 63.355-63.355 63.14z'
          />
        </g>
        <mask
          id='a'
          maskUnits='userSpaceOnUse'
          x='22'
          y='23'
          width='121'
          height='120'
        >
          <path
            transform='matrix(.71003 -.70417 .71003 .70417 22 83)'
            fill='#C4C4C4'
            d='M0 0h85.207v85.207H0z'
          />
        </mask>
        <g mask='url(#a)'>
          <path fill='url(#guide-avatar1__pattern0)' d='M19 19h128v128H19z' />
        </g>
        <g filter='url(#guide-avatar1__filter1_d)'>
          <path
            stroke='#E6E2CF'
            strokeWidth='2'
            d='M7.418 82.615l3.303-3.292 3.292 3.303-3.303 3.293z'
          />
        </g>
        <g filter='url(#guide-avatar1__filter2_d)'>
          <path
            stroke='#E6E2CF'
            strokeWidth='2'
            d='M79.571 10.704l3.304-3.292 3.292 3.303-3.303 3.292z'
          />
        </g>
        <g filter='url(#guide-avatar1__filter3_d)'>
          <path
            d='M14.767 78.584l64.062-63.847'
            stroke='#E6E2CF'
            strokeWidth='2'
          />
        </g>
        <defs>
          <filter
            id='guide-avatar1__filter0_d'
            x='12.874'
            y='13.306'
            width='140.126'
            height='139.694'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1'
              operator='dilate'
              in='SourceAlpha'
              result='effect1_dropShadow'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='2.5' />
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='guide-avatar1__filter1_d'
            x='0'
            y='71.912'
            width='21.441'
            height='21.409'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1'
              operator='dilate'
              in='SourceAlpha'
              result='effect1_dropShadow'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='2.5' />
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='guide-avatar1__filter2_d'
            x='72.155'
            y='0'
            width='21.441'
            height='21.409'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1'
              operator='dilate'
              in='SourceAlpha'
              result='effect1_dropShadow'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='2.5' />
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='guide-avatar1__filter3_d'
            x='8.058'
            y='8.031'
            width='77.479'
            height='77.259'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1'
              operator='dilate'
              in='SourceAlpha'
              result='effect1_dropShadow'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='2.5' />
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <pattern
            id='guide-avatar1__pattern0'
            patternContentUnits='objectBoundingBox'
            width='1'
            height='1'
          >
            <use xlinkHref='#guide-avatar1__image0' transform='scale(.0039)' />
          </pattern>
          <image
            id='guide-avatar1__image0'
            x='0'
            y='0'
            width='256'
            height='256'
            preserveAspectRatio='xMidYMid slice'
            xlinkHref={
              props.image?.large?.url ??
              props.image?.small?.url ??
              props.image?.medium?.url ??
              props.image?.thumbnail?.url
            }
          />
        </defs>
      </svg>
    )
  }
}
