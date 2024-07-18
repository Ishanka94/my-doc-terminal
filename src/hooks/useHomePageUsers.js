import { useState, useEffect } from 'react';
import { fetchTotalUserCount } from '../api/backendApi';

export const useTotalUsersCount = () => {
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [totalActiveUserCount, setTotalActiveUserCount] = useState(0);
  const [totalPendingUserCount, setTotalPendingUserCount] = useState(0);
  const [totalRejectedUserCount, setTotalRejectedUserCount] = useState(0);

  // const [dateList, setDateList] = useState<string[]>([]);
  // const [totalCostList, setTotalCostList] = useState<number[]>([]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const totalCountResponse = await fetchTotalUserCount();
        // console.log(totalCountResponse)
        if (totalCountResponse && totalCountResponse.data?.status === 1) {
          const userCounts = totalCountResponse.data;
          setTotalUsersCount(userCounts.totalUserCount);
          setTotalActiveUserCount(userCounts.activeUserCount);
          setTotalPendingUserCount(userCounts.pendingUserCount);
          setTotalRejectedUserCount(userCounts.rejectedUserCount);
        } else {
          // throw new Error('Invalid total cost response structure');
        }
      } catch (err) {
        // handleFetchError();
      }
    };

    fetchUserCount();
  }, []);

  return { totalUsersCount, totalActiveUserCount, totalPendingUserCount, totalRejectedUserCount };
};
