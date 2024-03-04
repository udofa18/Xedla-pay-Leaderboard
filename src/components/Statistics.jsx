import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
    CardHeader,
} from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import user from "/images/user.png"
import refer from "/images/refer.jpg"
import { StarIcon } from "@heroicons/react/24/solid";

function Statistics() {
    const [userData, setUserData] = useState([]);
    const [totalAge, setTotalAge] = useState([]);
    const [topTenUsers, setTopTenUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/?results=100');
                const data = await response.json();
                setUserData(data.results);
                const totalAge = data.results.reduce((acc, user) => acc + user.dob.age, 0);
                setTotalAge(totalAge)
                const sortedUsers = data.results.slice().sort((a, b) => b.dob.age - a.dob.age);
                const topTenUsers = sortedUsers.slice(0, 10);
                setTopTenUsers(topTenUsers);
                console.log(topTenUsers)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full  text-black">
            <div className="w-full  text-black flex flex-wrap gap-4 justify-center p-20">
                <Card className="mt-6 w-96 bg-purple-900 shadow-lg">
                    <CardBody className="flex">
                        <div>
                            <img src={user} className="w-32"></img>
                        </div>
                        <div className="m-auto">
                            <Typography variant="h1" color="white" className="mb-2 text-left">
                                {userData.length}
                            </Typography>
                            <Typography variant="h4" className="text-yellow-700">
                                Registered Users
                            </Typography>
                        </div>


                    </CardBody>

                </Card>

                <Card className="mt-6 w-96 bg-yellow-700 shadow-lg">
                    <CardBody className="flex">
                        <div>
                            <img src={refer} className="w-32 rounded-full"></img>
                        </div>
                        <div className="m-auto">
                            <Typography variant="h1" color="white" className="mb-2 text-left">
                                {totalAge}
                            </Typography>
                            <Typography variant="h4" className="text-black">
                                Total Referrals
                            </Typography>
                        </div>


                    </CardBody>

                </Card>

            </div>
            <div className="py-20 bg-purple-100/50 ">
                <h1 className="text-3xl">10 Top Users based on Referrals</h1>
                <div className="flex flex-wrap gap-10 p-10  justify-center">
                    {topTenUsers?.map((user) => {
                        const uniqueKey = `${user.name.first}-${user.name.last}`;
                        return (
                            <div key={uniqueKey}>
                                <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
                                    <CardHeader
                                        color="transparent"
                                        floated={false}
                                        shadow={false}
                                        className="mx-0 flex items-center gap-4 pt-0 pb-8"
                                    >
                                        <Avatar
                                            size="lg"
                                            variant="circular"
                                            src={user.picture.medium}
                                            alt="tania andrew"
                                        />
                                        <div className="flex w-full flex-col gap-0.5">
                                            <div className="flex items-center justify-between">
                                                <Typography variant="h6" color="blue-gray">
                                                    {user.name.first}{" "}{user.name.last}
                                                </Typography>
                                                

                                            </div>
                                            <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {user.email}
                                                </Typography>
                                            <Typography color="blue-gray " className="text-left">{user.location.state}</Typography>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="mb-6 p-0">
                                        <Typography>
                                            {user.dob.age} Referred Users;
                                        </Typography>
                                    </CardBody>
                                </Card>
                            </div>)
                    }
                    )}
                </div>
            </div>
        </div>
    )
}
export default Statistics