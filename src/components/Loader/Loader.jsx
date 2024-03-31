import st from "./index.module.scss";

export const Loader = () => {
  return (
    <div className={st.loaderWrapper}>
      <div className={st.loader}></div>
    </div>
  );
};
