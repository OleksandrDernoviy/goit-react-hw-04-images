// import { createPortal } from 'react-dom';
import css from '../Loader/loader.module.css'
import { LineWave } from 'react-loader-spinner';

const Loader = () => {
  return (
    <LineWave
      height="500"
      width="500"
      color="#4fa94d"
      ariaLabel="line-wave"
      wrapperStyle={{}}
      wrapperClass={css.loaderWrapper}
      visible={true}
      firstLineColor="red"
      middleLineColor="green"
      lastLineColor="yellow"
    />
  );
};
export default Loader;

