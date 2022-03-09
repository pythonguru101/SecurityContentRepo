//@ts-check
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../..';
import { getPosts, getPostsByConnection } from '../../services/post.service';
import Button from '../Common/Button';
import CreatePost from './CreatePost';
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import profilePicture from '../../assets/avtar-rect.svg';
import useState from 'react-usestateref';

const pageSize = 20;

const initialPost = {
    id: null,
    photos: []
};

const Questions = ({ history }) => {
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPost, setCurrentPost, currentPostRef] = useState(initialPost);
    const [posts, setPosts] = useState([]);
    const { userInfo } = useContext(GlobalContext);

    useEffect(() => {
        onGetPosts();
    }, []);

    const onGetPosts = async () => {
        try {
            const { data, statusText } = await getPostsByConnection(pageSize, 0);

            if (data?.length < 1) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setPosts([...data]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoreData = async () => {
        try {
            let pageIndex = Math.floor((posts.length - 1) / pageSize);
            const { data, statusText } = await getPostsByConnection(pageSize, pageIndex + 1);
            if (data?.length < 1) {
                setHasMore(false);
            } else {
                setPosts([...posts, ...data]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const profilePhoto = userInfo && userInfo.photo ? userInfo.photo : profilePicture;

    return (
        <>
            <div
                id="scrollableDiv"
                className=" relative h-screen z-10 overflow-x-hidden overflow-y-auto">
                {showCreatePostModal && (
                    <CreatePost
                        onPost={() => {
                            setShowCreatePostModal(false);
                            onGetPosts();
                            setCurrentPost(initialPost);
                        }}
                        onClose={() => {
                            setShowCreatePostModal(false);
                            setCurrentPost(initialPost);
                        }}
                        postData={currentPostRef?.current}
                    />
                )}
                <div className="px-6 md:px-12 flex items-center py-36 w-full">
                    <div className="flex flex-1 justify-center w-full">
                        <header style={{ flex: 2 }} className="text-white py-4 h-auto">
                            <div style={{}}></div>
                        </header>
                        <main style={{ flex: 5 }} role="main">
                            <div className="flex flex-1" style={{}}>
                                <section
                                    className="flex-4 border border-y-0 border-gray-800"
                                    style={{ flex: 4 }}>
                                    <aside>
                                        <div
                                            className="flex cursor-pointer"
                                            onClick={() => {
                                                setShowCreatePostModal(true);
                                            }}>
                                            <hr className="border-gray-800" />
                                            <div className={'flex flex-col flex-1'}>
                                                <div className="flex p-4 pb-0">
                                                    <div className="w-10 mr-2">
                                                        <img
                                                            className="inline-block h-10 w-10 rounded-full"
                                                            src={profilePhoto}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div
                                                        style={{}}
                                                        className="flex-1 bg-gray-800 rounded-3xl items-center h-12 p-2">
                                                        <span className="pl-3 bg-transparent text-gray-400 font-medium text-lg w-full resize-none focuc-visible:border-opacity-0">
                                                            What's happening?
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex p-4 mb-2">
                                                    <div className="w-10"></div>

                                                    <div className="w-64 px-2">
                                                        <div className="flex items-center"></div>
                                                    </div>

                                                    <div className="flex-1 flex">
                                                        <div className="flex flex-1 justify-end">
                                                            <Button
                                                                text={'Create Post'}
                                                                className={'w-40 rounded-3xl'}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </aside>
                                    <hr className="border-gray-800" />
                                    <ul className="list-none">
                                        <InfiniteScroll
                                            dataLength={posts.length}
                                            next={fetchMoreData}
                                            hasMore={hasMore}
                                            loader={
                                                <h4 className="text-white text-center p-8">
                                                    Loading...
                                                </h4>
                                            }
                                            style={{ overflow: 'unset' }}
                                            scrollableTarget="scrollableDiv">
                                            {posts.map((post) => {
                                                return (
                                                    <Post
                                                        key={post.id}
                                                        post={{
                                                            ...post,
                                                            profilePhoto: post?.user?.photo || profilePicture,
                                                            name: post?.user?.name,
                                                            userName: post?.user?.username
                                                        }}
                                                        onDelete={() => {
                                                            onGetPosts();
                                                        }}
                                                        onEdit={() => {
                                                            setCurrentPost(post);
                                                            setShowCreatePostModal(true);
                                                        }}
                                                        hideEdit={post?.user?.id !== userInfo.id}
                                                    />
                                                );
                                            })}
                                        </InfiniteScroll>
                                    </ul>
                                </section>
                                <aside style={{ flex: 2 }} className="position-relative">
                                    <div style={{}}>
                                        <div className="overflow-y-auto fixed h-screen"></div>
                                    </div>
                                </aside>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Questions;
