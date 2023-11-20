// import { createPortal } from 'react-dom';
import css from '../Loader/loader.module.css'
import { LineWave } from 'react-loader-spinner';

const Loader = () => {
  return (
    <LineWave
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="line-wave"
      wrapperStyle={{}}
      wrapperClass={css.loaderWrapper}
      visible={true}
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
  );
};
export default Loader;

