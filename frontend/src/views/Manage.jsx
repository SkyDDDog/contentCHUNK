import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import React from "react";
import ManageOverview from "./ManageOverview";
import ManageContent from "./ManageContent";
import ManageTable from "./ManageTable";
import ManageCard from "./ManageCard";
import {StatisticsProvider} from "../api/WechatArticleStats";
import {UserStatisticsProvider} from "../api/WechatFollowerStats";

export default function Manage(){
  return (
    <>
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList>
          <Tab>
            总览视图
          </Tab>
          <Tab>
            内容管理
          </Tab>
          <Tab>
            表格视图
          </Tab>
          <Tab>
            卡片视图
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <UserStatisticsProvider>
              <StatisticsProvider>
                <ManageOverview />
              </StatisticsProvider>
            </UserStatisticsProvider>
          </TabPanel>
          <TabPanel>
            <ManageContent />
          </TabPanel>
          <TabPanel>
            <ManageTable />
          </TabPanel>
          <TabPanel>
            <ManageCard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
