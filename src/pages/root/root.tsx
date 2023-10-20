import React from 'react';
import Spacing from '../../components/spacing';
import classes from './root.module.scss';

const imageArray = [
  'https://fastly.picsum.photos/id/1060/200/300.jpg?hmac=xYtFmeYcfydIF3-Qybnra-tMwklX69T52EtGd-bacBI',
  'https://fastly.picsum.photos/id/1077/200/300.jpg?hmac=BqQneQETTwZkHqmZmg4VxHsD-Lia-Qxp6nXv0c2eaac',
  'https://fastly.picsum.photos/id/756/200/300.jpg?hmac=kojqQY60yVD4KaSEFOEw62LRuwfiOR2f-6ZdnEgKhxM',
  'https://fastly.picsum.photos/id/385/200/300.jpg?hmac=IG8cHDliDmlgbSYX1yquX_5cAHcuS_O378oPs5rZGrU',
  'https://fastly.picsum.photos/id/979/200/300.jpg?hmac=VPyKJONiCJZ0uDkMSUYGHAmGqBjjH307k7K8AOmqQSM',
];

const testarr = ['1', '2', '3', '4'];

export function Root() {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [cardIndex, setCardIndex] = React.useState(0);
  const [isSpinning, setIsSpinning] = React.useState<
    'toLeft' | 'toRight' | 'idle'
  >('idle');
  const fowardCardSrcRef = React.useRef(imageArray[cardIndex]);
  const backgroundCardSrcRef = React.useRef(imageArray[cardIndex + 1]);

  React.useEffect(() => {
    const slider = sliderRef.current;

    const onAnimationEnd = () => {
      setIsSpinning('idle');
    };

    const onAnimationStart = () => {
      if (isSpinning === 'toLeft') {
        fowardCardSrcRef.current = imageArray[cardIndex];
        backgroundCardSrcRef.current = imageArray[cardIndex - 1];
      } else if (isSpinning === 'toRight') {
        fowardCardSrcRef.current = imageArray[cardIndex];
        backgroundCardSrcRef.current = imageArray[cardIndex + 1];
      }
    };

    slider?.addEventListener('animationend', onAnimationEnd);
    slider?.addEventListener('animationstart', onAnimationStart);

    return () => {
      slider?.removeEventListener('animationend', onAnimationEnd);
      slider?.removeEventListener('animationstart', onAnimationStart);
    };
  }, [cardIndex, isSpinning]);

  const setSliderAnimation = () => {
    if (isSpinning === 'toLeft') {
      return classes.SpinLeft;
    } else if (isSpinning === 'toRight') {
      return classes.SpinRight;
    }

    return '';
  };

  const setFowardCardOpacity = () => {
    if (isSpinning !== 'idle') {
      return classes.FadeOut;
    }

    return '';
  };

  const setBackgroundCardOpacity = () => {
    if (isSpinning !== 'idle') {
      return classes.FadeIn;
    }

    return '';
  };

  return (
    <>
      <Spacing size={20} />
      <div className={classes.Wrapper}>
        <div
          ref={sliderRef}
          className={[classes.Slider, setSliderAnimation()].join(' ')}
        >
          <span style={{ '--i': 1 } as React.CSSProperties}>
            <img
              alt={testarr[cardIndex - 1]}
              src={backgroundCardSrcRef.current}
              draggable={false}
              className={[setBackgroundCardOpacity()].join(' ')}
            />
          </span>
          <span style={{ '--i': 2 } as React.CSSProperties}>
            <img
              alt={testarr[cardIndex]}
              src={fowardCardSrcRef.current}
              draggable={false}
              className={[setFowardCardOpacity()].join(' ')}
            />
          </span>
        </div>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}
      >
        <button
          onClick={() => {
            if (isSpinning === 'idle') {
              setIsSpinning('toLeft');

              setCardIndex((prev) => {
                if (prev <= 0) {
                  return imageArray.length - 1;
                }

                return prev - 1;
              });
            }
          }}
        >
          {'<'}
        </button>
        <button
          onClick={() => {
            if (isSpinning === 'idle') {
              setIsSpinning('toRight');

              setCardIndex((prev) => {
                if (prev >= imageArray.length - 1) {
                  return 0;
                }

                return prev + 1;
              });
            }
          }}
        >
          {'>'}
        </button>
      </div>
    </>
  );
}
