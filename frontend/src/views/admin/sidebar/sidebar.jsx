import './sidebar.css'

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="top">logo</div>
            <hr />
            <div className="center">
                <ul>
                    <li>
                        <span>
                            Posts
                        </span>
                    </li>
                    <li>
                        <span>
                            Comments
                        </span>
                    </li>
                    <li>
                        <span>
                            Users
                        </span>
                    </li>
                    <li>
                        <span>
                            Home page
                        </span>
                    </li>
                </ul>
            </div>
            <div className="botton"></div>
        </div>
    )
}

export default SideBar