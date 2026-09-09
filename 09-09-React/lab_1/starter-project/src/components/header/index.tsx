
type AvrahamSuitsHeaderProps = {
    audienceName: string;
    color?:string
    backgroundColor?:string
  }
  function AvrahamSuitsHeader(props:AvrahamSuitsHeaderProps){
    console.log("componenet loaded...")
    const { color,backgroundColor, audienceName} = props
  
    return (
      <h2 style={{ color, backgroundColor }}> Avraham Suits -  {audienceName} {new Date().toString()} </h2>
    )
  }

  export default AvrahamSuitsHeader;