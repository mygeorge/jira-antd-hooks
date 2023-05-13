import { ProjectListScreen } from 'screens/project-list';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import styled from '@emotion/styled';
import { Row } from './component/lib';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import { ReactComponent } from '*.svg';
import { useDocumentTitle } from './utils';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProjectScreen } from './screens/ProjectScreen';

/***
 *  grid 和flex
 *  1. 一维布局 用flex 二维布局用 grid
 *  2. 从内容出发:  先有一组内容(数量不固定)然后希望他们均匀的分布在容器中,
 *  由内容自己的大小决定占据的空间 用flex
 *     从布局出发: 先规划网格(数量一般比较固定), 然后再把元素往里填充用grid
 * @constructor
 */
export const AuthenticatedApp = () => {
  const value: any = undefined;
  // useDocumentTitle('登录成功页面')
  return (
    <Container>
      {/*{value.notExist}*/}
      <PageHeader />
      <Main>
        {/*<ProjectListScreen/>*/}
        <Router>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />} />
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
            <Route path='*' element={<Navigate to='/projects' replace={true} />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

// 规划

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* svg 可以自定义样式*/}
        <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button type={'link'} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={'link'} onClick={e => e.preventDefault()}>
            Hi {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const HeaderItem = styled.h3``;
// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  width: 100%;
`;