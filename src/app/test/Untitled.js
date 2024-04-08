// const getPaletteHeight = () => {
//   let palette = document.querySelector('[class*="palette"]');
//   if (palette) {
//     let { top, bottom } = palette.getBoundingClientRect();

//     setPaletteHeight(bottom - top);
//   }
// };

// const scrollToBottom = () => {
//   let palette = document.querySelector('[class*="palette"]');
//   if (palette) {
//     let { bottom } = palette.getBoundingClientRect();
//     let viewportHeight = window.innerHeight;
//     console.log(bottom, viewportHeight, document.body.scrollHeight);
//     if (bottom > viewportHeight) {
//       // window.scrollTo({
//       //   top: document.body.scrollHeight,
//       //   behavior: 'smooth',
//       // });
//       let overlay = document.querySelector('[class*="overlay"]');
//       overlay?.scrollTo({
//         top: document.body.scrollHeight,
//       });
//     }
//   }
// };

// useEffect(() => {
//   if (editing) {
//     // setHeight(document.body.scrollHeight);
//     // scrollToBottom();
//   }
// }, [editing]);
