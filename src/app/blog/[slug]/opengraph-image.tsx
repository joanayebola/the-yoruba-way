import { ImageResponse } from 'next/og'
import { MOCK_POSTS } from '@/data/mock-data'

export const runtime = 'edge'

export const alt = 'The Yorùbá Way'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
    const post = MOCK_POSTS.find((p) => p.slug === params.slug)

    if (!post) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 48,
                        background: '#FDF5E6',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1a1a1a',
                        fontWeight: 'bold',
                    }}
                >
                    The Yorùbá Way
                </div>
            ),
            {
                ...size,
            }
        )
    }

    // Define colors
    const cream = '#FDF5E6'
    const accent = '#D2691E'
    const foreground = '#1a1a1a'

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: cream,
                    padding: '60px 80px',
                    position: 'relative',
                    justifyContent: 'space-between',
                }}
            >
                {/* Abstract Background Decoration */}
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 400,
                        height: 400,
                        background: 'rgba(210, 105, 30, 0.08)',
                        borderRadius: '50%',
                    }}
                />

                {/* Top Section: Site Name */}
                <div
                    style={{
                        display: 'flex',
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: accent,
                        textTransform: 'uppercase',
                        letterSpacing: '0.3em',
                    }}
                >
                    The Yorùbá Way
                </div>

                {/* Main Content: Split into Title and Visual */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexGrow: 1,
                        gap: '40px',
                    }}
                >
                    {/* Text Content */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 64,
                                fontWeight: 'bold',
                                color: foreground,
                                lineHeight: 1.1,
                                marginBottom: '24px',
                            }}
                        >
                            {post.title}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                fontSize: 24,
                                color: 'rgba(26, 26, 26, 0.6)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            {post.category} • {post.readingTime}
                        </div>
                    </div>

                    {/* Featured Image Frame */}
                    <div
                        style={{
                            display: 'flex',
                            width: '400px',
                            height: '400px',
                            backgroundColor: foreground,
                            borderRadius: '40px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                            border: `1px solid rgba(210, 105, 30, 0.2)`,
                            position: 'relative',
                        }}
                    >
                        {/* We use a placeholder for the image as absolute URLs can be tricky in local dev
                But we'll add the article image if possible. 
                For now, a beautiful stylized block that represents the visual. */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: `linear-gradient(45deg, #1a1a1a, ${accent})`,
                                fontSize: 120,
                            }}
                        >
                            {post.title[0]}
                        </div>
                    </div>
                </div>

                {/* Footer: Tagline */}
                <div
                    style={{
                        display: 'flex',
                        fontSize: 18,
                        fontStyle: 'italic',
                        color: 'rgba(26, 26, 26, 0.4)',
                        borderTop: `1px solid rgba(210, 105, 30, 0.1)`,
                        paddingTop: '20px',
                    }}
                >
                    Reclaiming the Lineage • Decolonizing the Oracle
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
