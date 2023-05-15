import 'wdyr';
import { SearchPanel } from 'screens/project-list/search-panel';
import List from 'screens/project-list/list';
import React, { useEffect, useState } from 'react';
import { useDebounce, useDocumentTitle, useMount } from '../../utils';
import qs from 'qs';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import { useProject } from '../../utils/project';
import { useUsers } from '../../utils/user';
import { useUrlQueryParam } from '../../utils/url';
import { useProjectsSearchParams } from './util';

type UserType = {
  id: number;
  name: string;
  token: string;
};
type ProjectType = {
  id: string;
  pin: boolean;
  name: string;
  personId: number | undefined;
  ths: string;
  strings: string;
  caters: string;
  created: string;
  organization: string;
  keg: string;
};
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = (): JSX.Element => {
  useDocumentTitle('项目列表', false);
  // const [,setParam] = useState({
  //   name: '',
  //   personId: '',
  // });
  // const[ keys ] = useState<('name' | 'personId')[]>()

  // const [users, setUsers] = useState<UserType[]>([]);
  const [param, setParam] = useProjectsSearchParams();
  console.log(useUrlQueryParam['name']);
  // const client = useHttp()
  // 列表刷新
  const { isLoading, error, data: list, retry } = useProject(useDebounce(param, 2000));
  const { data: users } = useUsers();
  // console.log(client,"client")

  // useEffect(() => {
  //   fetch(`${apiUrl}/projects?${qs.stringify({ ...cleanObject(useDebounceParam) })}`).then(
  //     async res => {
  //       if (res.ok) {
  //         setList(await res.json());
  //       }else{
  //         alert("error waring")
  //       }
  //     }
  //   ).catch(() =>alert("error waring"))
  //
  // },[useDebounceParam]);
  //   fetch('./_json_server_mock_/list.json').then(async  res =>{
  //     if(res.ok){
  //         setList(await res.json())
  //     }
  // })
  //   }, [useDebounceParam]);
  //   useMount(() => {
  //     client('users').then(setUsers)
  //     fetch(`${apiUrl}/users`).then(async res => {
  //       if (res.ok) {
  //         setUsers(await res.json());
  //       }
  //     });
  //   });
  // @ts-ignore
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} users={users || []} setParam={setParam} list={list || []} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List refresh={retry} dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

// 跟踪组件
ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
