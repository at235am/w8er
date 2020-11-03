import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom components:
import FloorMapBackground from "../components/FloorMapBackground";

// gif previews:
import editFloorMap from "../assets/gif-previews/edit-floor-map.gif";
import addToWaitlist from "../assets/gif-previews/add-to-waitlist.gif";
import assignSeats from "../assets/gif-previews/assign-seats.gif";
import moveSubList from "../assets/gif-previews/move-sub-lists.gif";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/UserState";

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const WidthEqual = styled.div`
  max-width: 50rem;
`;

const FeatureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  /* width: 100%; */
  margin: 2rem;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.outline};

  position: relative;
  z-index: 5;
`;

const GifPreview = styled.img`
  object-fit: cover;
  width: 90%;
  max-width: 600px;
  margin: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  /* height: 250px; */
`;

const PreviewHeader = styled.h2`
  /* font-weight: bold; */
  font-style: italic;
  color: ${({ theme }) => theme.colors.onBackground};
`;

const FeatureDescription = styled.p`
  /* font-weight: bold; */
  /* max-width: 100%; */
  color: ${({ theme }) => theme.colors.onBackground};
  margin-bottom: 1rem;
`;
const FeatureHeader = styled.h2`
  font-weight: bold;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.onBackground};
  margin-bottom: 1rem;
`;

const HighlightLink = styled(Link)`
  font-weight: bold;

  color: ${({ theme }) => theme.colors.primary};
`;

const HighlightLink2 = styled.a`
  font-weight: bold;

  color: ${({ theme }) => theme.colors.primary};
`;

const FeaturesPage = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <FeaturesContainer>
      <WidthEqual>
        <FeatureWrapper>
          <FeatureHeader>Features</FeatureHeader>
          <FeatureDescription>
            These are just some of our features with much more on the way!
            Please play around with the app to discover more. Keep in mind that
            at this time, nothing you input on our site will be saved.
          </FeatureDescription>

          <FeatureDescription>
            To test out our features, go through our sign up process here:{" "}
            <HighlightLink to="/register">register for w8r!</HighlightLink>
          </FeatureDescription>

          <FeatureDescription>
            You can skip the sign up process here:{" "}
            <HighlightLink2
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setUser("sldjf");
              }}
            >
              let me play with your webapp!
            </HighlightLink2>
          </FeatureDescription>
        </FeatureWrapper>
        <FeatureWrapper>
          <PreviewHeader>Create your own restaurants layout!</PreviewHeader>
          <GifPreview src={editFloorMap} alt="editing floor maps" />
        </FeatureWrapper>
        <FeatureWrapper>
          <PreviewHeader>Add a guest to a waitlist!</PreviewHeader>
          <GifPreview src={addToWaitlist} alt="add to waitlist" />
        </FeatureWrapper>
        <FeatureWrapper>
          <PreviewHeader>Assign your guests a seat!</PreviewHeader>
          <GifPreview src={assignSeats} alt="assigning seats" />
        </FeatureWrapper>
        <FeatureWrapper>
          <PreviewHeader>Seat your customers!</PreviewHeader>
          <GifPreview src={moveSubList} alt="move to subList" />
        </FeatureWrapper>
      </WidthEqual>
      {/* <FloorMapBackground /> */}
    </FeaturesContainer>
  );
};

export default FeaturesPage;
