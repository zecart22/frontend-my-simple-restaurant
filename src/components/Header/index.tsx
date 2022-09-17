import {
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  useMediaQuery,
  keyframes,
} from "@chakra-ui/react";

import { FaUserCircle } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { api } from "../../services";

import { BiLogOut } from "react-icons/bi";

export const Header = () => {
  const { signOut } = useAuth();

  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [userType, setUserType] = useState([]);
  const [userData, setUserData] = useState([]);

  const user_id = localStorage.getItem("@AcessUserID");
  const token = localStorage.getItem("@AcessToken");

  const loadUserDetails = useCallback(async () => {
    try {
      const response = await api.get(`/user_details?user_id=${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { name, email, type } = response.data;
      setUserEmail(email);
      setUserName(name);
      setUserType(type);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const AppearFromRight = keyframes`
  from {opacity: 0;}
  to {transform: translateX(0px)}
  `;

  const history = useHistory();

  const handleNavigation = (path: any) => {
    return history.push(path);
  };

  const [isLargerThan1302] = useMediaQuery("(min-width: 1302px)");

  const location = useLocation();
  let isDash = true;

  if (location.pathname !== "/dashboard") {
    isDash = false;
  }

  return (
    <>
      <Flex
        h="120px"
        flexDirection="row"
        justifyContent="space-between"
        px="5"
        py="1"
        bg={"theme.grafit"}
        boxShadow="0px 1px 4px"
        position="relative"
        width="100%"
        zIndex="100"
      >
        {isLargerThan1302 ? (
          <>
            <Flex>
              <HStack animation={`${AppearFromRight} 3s`}>
                <Text
                  fontSize={40}
                  fontFamily={"Rock Salt, cursive"}
                  color={"theme.red"}
                >
                  TEXAS
                </Text>

                <Text fontSize={30} color={"theme.white"} fontWeight={"bold"}>
                  {"Burguers"}
                </Text>
              </HStack>
            </Flex>
            <Flex alignItems="flex-end" mb={"10px"}>
              <HStack spacing="8" mr={5}>
                {!isDash ? (
                  <>
                    <Link to={"/dashboard"}>
                      <VStack>
                        <MdDashboardCustomize size={50} color={"white"} />

                        <Text color={"theme.white"}>Dashboard</Text>
                      </VStack>
                    </Link>
                  </>
                ) : (
                  <></>
                )}

                <VStack spacing={2}>
                  <FaUserCircle size={45} color={"white"} />
                  <HStack>
                    <Text
                      textDecoration={"none"}
                      fontWeight={"extrabold"}
                      textAlign={"left"}
                      color={"theme.white"}
                    >
                      Olá, {userName} |
                    </Text>
                    <Text
                      fontFamily={"Rock Salt, cursive"}
                      textDecoration={"none"}
                      fontWeight={"extrabold"}
                      textAlign={"left"}
                      color={"theme.green"}
                    >
                      {userType}
                    </Text>
                  </HStack>
                </VStack>

                <VStack>
                  <BiLogOut size={50} color={"white"} />
                  <Button
                    variant={"ghost"}
                    color={"theme.red"}
                    onClick={signOut}
                  >
                    Log Out
                  </Button>
                </VStack>
              </HStack>
            </Flex>
          </>
        ) : (
          <>
            <Flex alignItems="center">
              <HStack spacing={[10, 39, 60]}>
                <VStack animation={`${AppearFromRight} 3s`}>
                  <Text
                    fontSize={[20, 30]}
                    fontFamily={"Rock Salt, cursive"}
                    color={"theme.red"}
                  >
                    TEXAS
                  </Text>

                  <Text
                    fontSize={[10, 20]}
                    color={"theme.white"}
                    fontWeight={"bold"}
                  >
                    {"Burguers"}
                  </Text>
                </VStack>
                <VStack spacing={2}>
                  <FaUserCircle size={25} color={"white"} />
                  <VStack>
                    <Text
                      fontSize={12}
                      textDecoration={"none"}
                      fontWeight={"extrabold"}
                      textAlign={"center"}
                      color={"theme.white"}
                    >
                      {userName}
                    </Text>
                    <Text
                      fontSize={8}
                      fontFamily={"Rock Salt, cursive"}
                      textDecoration={"none"}
                      fontWeight={"extrabold"}
                      textAlign={"left"}
                      color={"theme.green"}
                    >
                      {userType}
                    </Text>
                  </VStack>
                </VStack>
                <VStack>
                  <BiLogOut size={30} />
                  <Button
                    variant={"ghost"}
                    color={"theme.red"}
                    onClick={signOut}
                    fontSize={[10, 20]}
                  >
                    Log Out
                  </Button>
                </VStack>
              </HStack>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};
