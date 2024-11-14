import { Link } from 'react-router-dom'
import './sidebar.css'

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="top">logo</div>
            <hr />
            <div className="center">
                <ul>
                    <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
                        <li>
                            <span>
                                DashBoard
                            </span>
                        </li>
                    </Link>
                    <p><b>Data</b></p>
                    <li>
                        <span>
                            Faultfinding
                        </span>
                    </li>
                    <Link to="/admin/posts" style={{ textDecoration: "none" }}>
                        <li>
                            <span>
                                Posts
                            </span>
                        </li>
                    </Link>
                    {/* admin/dashboard */}
                    <li>
                        <span>
                            Category
                        </span>
                    </li>
                    <li>
                        <span>
                            Topics
                        </span>
                    </li>
                    <li>
                        <span>
                            Community
                        </span>
                    </li>
                    <p><b>Users and interactions</b></p>
                    <li>
                        <span>
                            Users account
                        </span>
                    </li>
                    <li>
                        <span>
                            Comments
                        </span>
                    </li>
                    <li>
                        <span>
                            Faultfinding
                        </span>
                    </li>
                    <p><b>Notifications and warnings</b></p>
                    <li>
                        <span>
                            Notifications
                        </span>
                    </li>
                    <li>
                        <span>
                            Warnings
                        </span>
                    </li>
                    <li>
                        <span>
                            Announce
                        </span>
                    </li>
                    <li>
                        <span>
                            <b>Statistics and reporting</b>
                        </span>
                    </li>
                    <li>
                        <span>
                            <b>System settings</b>
                        </span>
                    </li>
                    <li>
                        <span>
                            <b>Support and feedback</b>
                        </span>
                    </li>
                </ul>
            </div>
            <div className="botton"></div>
        </div>
    )
}

export default SideBar