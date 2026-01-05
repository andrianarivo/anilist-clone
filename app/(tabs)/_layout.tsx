import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

export default function TabLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <Label>Home</Label>
                <Icon sf="house.fill" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="search">
                <Label>Search</Label>
                <Icon sf="magnifyingglass" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="social">
                <Label>Social</Label>
                <Icon sf="person.2.fill" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="library">
                <Label>Library</Label>
                <Icon sf="play.square.stack.fill" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="profile">
                <Label>Profile</Label>
                <Icon sf="person.fill" />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
