import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import axios from 'axios';
import { styles } from './styles';

const Feed = () => {
    const [data, setData] = useState([]);
    const [isRefreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        if (!hasMore) {
            return;
        }

        axios.get(`https://picsum.photos/v2/list?page=${page}&limit=2`)
            .then(response => {
                const newData = response.data.filter(newItem => !data.some(item => item.id === newItem.id));
                setData([...data, ...newData]);
                setPage(page + 1);
                setHasMore(newData.length > 0);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
            .finally(() => {
                setRefreshing(false);
            });
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setPage(1);
        setData([]);
        setHasMore(true);
        fetchData();
    };

    const handleLoadMore = () => {
        fetchData();
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.download_url }} style={styles.image} />
            <Text style={styles.author}>{item.author}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        colors={['#9Bd35A', '#689F38']}
                        progressBackgroundColor="#ffffff"
                    />
                }
            />
        </View>
    );
};

export default Feed;
