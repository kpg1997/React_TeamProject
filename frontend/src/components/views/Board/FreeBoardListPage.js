import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Lists from "../Common/Lists";
import { useSelector } from "react-redux";

const TitleStyled = styled.div`
  text-align: center;
  font-size: 50px;
`;
const ListStyled = styled.div`
  div {
    display: inline-block;
    margin: 0 10px 0 0;
  }
`;
const WriteLinkStyled = styled.div`
  background-color:salmon;
  .but{
    color: white;
  }
  border: 1px solid rgb(185, 185, 185);
  border-radius: 25px;
  vertical-align: middle;
  padding: 15px;
  position: relative;
  right: 0px;
  width: 100px;
  text-align: center;
  margin: 30px auto 30px auto;
  transition: 0.5s;
  a {
    color: black;
  }
  &:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }
`;
const FreeBoardListPage = () => {
  const user = useSelector((state) => state.user);
  console.log("게시판 목록 ==> ", user);

  return (
    <div>
      <TitleStyled>자유게시판</TitleStyled>
      <WriteLinkStyled>
        <Link to={"/freeBoardwrite"} className="but">작성하기</Link>
      </WriteLinkStyled>
      <Lists/>
    </div>
  );
};

export default withRouter(FreeBoardListPage);
