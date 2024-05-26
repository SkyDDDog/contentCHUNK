import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // 引入 PropTypes
import axios from 'axios';

const StatisticsContext = createContext();

const StatisticsProvider = ({ children }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      const userId = '1749837707132424193'; // TODO 替换为实际的用户 ID
      try {
        const response = await axios.get(`http://123.249.33.39:10001/wechat-service/statistics/${userId}`, {
          headers: {
            accept: 'application/json',
          },
        });

        if (response.data.success && response.data.item.statistics.length > 0) {
          setStats(response.data.item.statistics);
        } else {
          console.error('No statistics found or request failed.');
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <StatisticsContext.Provider value={{ stats }}>
      {children}
    </StatisticsContext.Provider>
  );
};

// 添加 PropTypes 验证
StatisticsProvider.propTypes = {
  children: PropTypes.node.isRequired, // 声明 children 属性并指定其类型为 node
};

const useStatistics = () => useContext(StatisticsContext);

export { StatisticsProvider, useStatistics };
