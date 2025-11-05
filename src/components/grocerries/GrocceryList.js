function GrocceryList({
  id,
  name,
  calories,
  editable,
  removeMeHandler,
  nameChangeHandler,
  inputChangeHandler,
  enterPressHandler,
}) {
  return (
    <div className="item">
      <h4 data-id={id} onDoubleClick={nameChangeHandler}>
        Name:
        {editable ? (
          <input
            data-id={id}
            onChange={inputChangeHandler}
            onKeyDown={enterPressHandler}
          />
        ) : (
            
          <> {name}</>
        )}
      </h4>
      <h4>Calories: {calories}</h4>
      <button id={id} onClick={removeMeHandler}>
        Remove me
      </button>
    </div>
  );
}

export default GrocceryList;
