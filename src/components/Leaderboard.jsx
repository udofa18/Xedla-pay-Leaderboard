import React, { useState, useEffect } from 'react';
import { Option, Select, Spinner } from "@material-tailwind/react";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { AdjustmentsHorizontalIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

function Leaderboard() {

    const [userData, setUserData] = useState([]);
    const [search, setSearch] = useState("");
    const [postPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('highest'); // State to track sorting order
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPosts, setCurrentPosts] = useState([]);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/?results=100');
                const data = await response.json();
                setUserData(data.results); // Assuming data.results contains the array of user data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        if (search.trim() === "") {
            return userData; // Return all users when search input is empty
        } else {
            return userData.filter(
                (userData) =>
                    (userData.name.first &&
                        userData.name.first.toLowerCase().includes(search.toLowerCase())) ||

                    (userData.name.last &&
                        userData.name.last.toLowerCase().includes(search.toLowerCase())) ||
                    (userData.email &&
                        userData.email.toLowerCase().includes(search.toLowerCase())) ||

                    (userData.location.state &&
                        userData.location.state.toLowerCase().includes(search.toLowerCase()))
            );
        }
    };
    // useEffect(() => {
    //     const indexOfLastPage = currentPage * postPerPage;
    //     const indexOfFirstPage = indexOfLastPage - postPerPage
    //     setCurrentPosts(handleSearch()?.slice(indexOfFirstPage, indexOfLastPage));

    //     ;
    // }, [handleSearch, currentPage]);
    useEffect(() => {
        const indexOfLastPage = currentPage * postPerPage;
        const indexOfFirstPage = indexOfLastPage - postPerPage;
        setCurrentPosts(handleSearch().slice(indexOfFirstPage, indexOfLastPage));
    }, [search, userData, currentPage, postPerPage]);
    // const indexOfLastPage = currentPage * postPerPage;
    // const indexOfFirstPage = indexOfLastPage - postPerPage;
    // const currentPosts = handleSearch()?.slice(indexOfFirstPage, indexOfLastPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    const totalPosts = userData?.length;
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i);
    }
    const [activePage, setActivePage] = useState(1);
    const handlePrevious = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
            setActivePage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pageNumbers.length) {
            paginate(currentPage + 1);
            setActivePage(currentPage + 1);
        }
    };

    const handleSortHigh = (order) => {
        const sorted = [...currentPosts];

        sorted.sort((a, b) => a.dob.age - b.dob.age);

        setCurrentPosts(sorted)

        return sorted;

    };

    const handleSortLow = (order) => {
        const sorted = [...currentPosts];

        sorted.sort((a, b) => b.dob.age - a.dob.age);

        setCurrentPosts(sorted)

        return sorted;

    };

    const handleClear = () => {
        setSearch(""); // Clear the search input
        setCurrentPosts(currentPosts); // Reset the currentPosts with unsorted data
    };
    const generateRandomTier = () => {
        const tiers = ['Tier 1', 'Tier 2', 'Tier 3'];
        const randomIndex = Math.floor(Math.random() * tiers.length);
        return tiers[randomIndex];
    };
    const generateRandomRowData = () => {
        const row = {
            id: Math.random().toString(36).substr(2, 9), // Generate unique ID for each row
            tier: getRandomTier(), // Get random tier data
        };
        return row;
    };
    const generateRandomData = (rowCount) => {
        const data = [];
        for (let i = 0; i < rowCount; i++) {
            data.push(generateRandomRowData());
        }
        return data;
    };
    const getTierColor = (tier) => {
        switch (tier) {
            case 'Tier 1':
                return '#fbc02d'; // Set color for Tier 1
            case 'Tier 2':
                return 'purple'; // Set color for Tier 2
            case 'Tier 3':
                return '#83ba43'; // Set color for Tier 3
            default:
                return 'black'; // Default color
        }
    };
    const TABLE_HEAD = ["User", "Referral Code", "Verificaton Level", "Referral count", "Location",];

    return (
        <div className="text-black w-full ">
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray" className=' text-left'>
                                User list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all members
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button variant="outlined" className='border-yellow-700' size="sm" onClick={handleClear}>
                                clear
                            </Button>
                            <Button className="flex items-center gap-3 bg-purple-900" size="sm" onClick={handleSortHigh}>
                                <AdjustmentsHorizontalIcon strokeWidth={2} className="h-4 w-4" />   From Lowest
                            </Button>
                            <Button className="flex items-center gap-3 bg-yellow-700 text-black" size="sm" onClick={handleSortLow}>
                                <AdjustmentsHorizontalIcon strokeWidth={2} className="h-4 w-4" />   From Highest
                            </Button>
                            {/* <Select label="Filter" className='text-purple-900'   onChange={handleChange}>
                                <Option value="asc">From Highest</Option>
                                <Option value="desc">From Lowest</Option>
                            </Select> */}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                onChange={(e) => setSearch(e.target.value)}

                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}{" "}
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {userData ? (
                                currentPosts?.map(

                                    ({ picture, name, email, login, org, online, date, location, dob, index, }) => {
                                        const isLast = index === userData.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";
                                        const uniqueKey = `${name.first}-${name.last}`;
                                        const tier = generateRandomTier(); // Generate random tier data

                                        return (
                                            <tr key={uniqueKey}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={picture.medium} alt={name} size="sm" />
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className=" font-extrabold	"
                                                            >
                                                                {name.first}{""} {name.last}
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal opacity-70"
                                                            >
                                                                {email}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {login.username}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {org}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes} >
                                                    <div className="w-max" >
                                                        <Chip
                                                            variant="ghost"
                                                            size="sm"
                                                            style={{ color: getTierColor(tier) }}
                                                            value={tier}
                                                        />

                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {dob.age}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {location.state}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {location.country}


                                                        </Typography>
                                                    </div>
                                                </td>

                                            </tr>
                                        );

                                    })) : (
                                <tr className='py-20'>
                                    <td colSpan="6">
                                        <div className="flex justify-center">
                                            <Spinner color="purple" className="h-10 w-10" />
                                        </div>
                                    </td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        {currentPage} of {pageNumbers.length}
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" onClick={handlePrevious}>
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm" onClick={handleNext} >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}
export default Leaderboard