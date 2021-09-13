import logo from './logo.png'
const Logo = (props:any) => {
	return ( 
        <div className="shoe-container">
            <img src={logo} height={props.height} width={props.width} alt=""/>
        </div>
    );
}
export default Logo;