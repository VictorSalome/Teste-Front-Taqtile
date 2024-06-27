import { IHeaderTitleProps } from "../../interfaces/interface-components";


export const HeaderTitle = ( { title, className }: IHeaderTitleProps) => {
  return (
    <>
      <header className={className}>
        <h1 className='text-taqtile-font-primary text-center text-3xl font-bold'>{title}</h1>
      </header>
    </>
  );
};
