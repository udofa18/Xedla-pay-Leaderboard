import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";

function Body() {
    return (
        <div className="relative ">

            <Card className="h-full   max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-purple-900 rounded-none text-white">

                <List className="text-white">
                    <NavLink to="/dashboard/statistics" className="flex text-white active:text-black">

                        <ListItem>
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5 text-yellow-700" />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                    </NavLink>
                    <NavLink to="/dashboard/leaderboard" className="flex text-white active:text-black">

                        <ListItem>

                            <ListItemPrefix>
                                <ChartBarIcon className="h-6 w-6  text-yellow-700" />
                            </ListItemPrefix>
                            Leaderboard
                        </ListItem>
                    </NavLink>
                   
                </List>


            </Card>
            
        </div>
    );


}
export default Body