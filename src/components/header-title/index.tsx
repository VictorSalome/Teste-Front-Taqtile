import { IHeaderTitleProps } from "../../interfaces/interface-components";


export const HeaderTitle = ({ title }: IHeaderTitleProps) => {
  return (
    <>
      <header className='mt-20 mb-16 md:mt-52 '>
        <h1 className='text-taqtile-font-primary text-center text-3xl font-bold'>{title}</h1>
      </header>
    </>
  );
};
