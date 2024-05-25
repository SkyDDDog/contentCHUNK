import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // 引入 PropTypes
import axios from 'axios';

const UserStatisticsContext = createContext();

const UserStatisticsProvider = ({ children }) => {
  const [userStats, setUserStats] = useState({ newUser: null, cancelUser: null });

  useEffect(() => {
    const fetchUserStatistics = async () => {
      const userId = '1749837707132424193'; // 这应该是你想查询的实际用户ID
      try {
        const response = await axios.get(`http://123.249.33.39:10001/wechat-service/statistics/user/${userId}`, {
          headers: {
            accept: 'application/json',
          },
        });

        if (response.data.success) {
          setUserStats(response.data.item.user);
        } else {
          console.error('Request succeeded but no user statistics data available.');
        }
      } catch (error) {
        console.error('Error fetching user statistics:', error);
      }
    };

    fetchUserStatistics();
  }, []);

  return (
    <UserStatisticsContext.Provider value={{ userStats }}>
      {children}
    </UserStatisticsContext.Provider>
  );
};

// 添加 PropTypes 验证
UserStatisticsProvider.propTypes = {
  children: PropTypes.node.isRequired, // 声明 children 属性并指定其类型为 node
};

const useUserStatistics = () => useContext(UserStatisticsContext);

export { UserStatisticsProvider, useUserStatistics };
