/* eslint-disable-next-line react/prop-types, no-unused-vars */
const Square = ({children, isSelected, updateBoard, index}) => {
  
  const ClassName = `square ${isSelected == true ? 'is-selected' : ''}`;
    
  const handleClick = () => {
    updateBoard(index);
  };
  
  return(
    <div onClick={handleClick} className={ClassName}>
      {children}
    </div>
  );
};