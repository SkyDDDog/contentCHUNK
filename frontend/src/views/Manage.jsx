import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import React from "react";
import ManageOverview from "./ManageOverview";
import ManageContent from "./ManageContent";
import ManageTable from "./ManageTable";

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
        </TabList>

        <TabPanels>
          <TabPanel>
            <ManageOverview />
          </TabPanel>
          <TabPanel>
            <ManageContent />
          </TabPanel>
          <TabPanel>
            <ManageTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
