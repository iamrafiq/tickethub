export default () =>{
    return <form>
        <h1>Sign Up</h1>
        <div className="form-group">
            <lable>Email Address</lable>
            <input type="text" className="from-control"/>
        </div>
        <div className="form-group">
            <lable>Password</lable>
            <input type="password" className="from-control"/>
        </div>
        <button className="btn btn-primary">Sign Up</button>
    </form>
}