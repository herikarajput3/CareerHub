import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const user = false;

    return (
        <header className="w-full bg-white shadow-sm">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
                <Link to="/" className="text-3xl font-extrabold tracking-widest text-gray-800" style={{ fontFamily: "Pacifico" }}>
                    Carrer<span className="text-[#F83002]">Hub</span>
                </Link>

                <div className="flex items-center gap-8">

                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-6">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/"
                                        className="text-gray-700 hover:text-[#F83002] font-medium transition-colors duration-200 text-[16px]"
                                    >
                                        Home
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/jobs"
                                        className="text-gray-700 hover:text-[#F83002] font-medium transition-colors duration-200 text-[16px]"
                                    >
                                        Jobs
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/browse"
                                        className="text-gray-700 hover:text-[#F83002] font-medium transition-colors duration-200 text-[16px]"
                                    >
                                        Browse
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {
                        !user ? (
                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    className="px-6 py-2 text-[15px] rounded-full border-gray-300 hover:text-[#F83002] transition"
                                    asChild
                                >
                                    <Link to="/login">Login</Link>
                                </Button>

                                <Button
                                    variant="default"
                                    className="bg-[#F83002] text-white px-6 py-2 text-[15px] rounded-full hover:bg-[#d62600] transition"
                                    asChild
                                >
                                    <Link to="/signup">Sign Up</Link>
                                </Button>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer hover:ring-2 ring-[#F83002] transition">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@herika" />
                                        <AvatarFallback>HR</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-64 p-4 shadow-xl rounded-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@herika" />
                                            <AvatarFallback>HR</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-sm">Herika Rajput</h4>
                                            <p className="text-xs text-muted-foreground">Software Engineer</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Button
                                            variant="ghost"
                                            className="w-full flex justify-start gap-2"
                                            asChild
                                        >
                                            <Link to="/profile">
                                                <User2 size={18} />
                                                View Profile
                                            </Link>
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            className="w-full flex justify-start gap-2"
                                            onClick={() => {
                                                localStorage.clear();
                                            }}
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default Navbar;
