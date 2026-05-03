const container = document.getElementById('container')

const fetchVideos = async () => {
	try {
		container.textContent = 'Loading...'

		const res = await fetch(
			'https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=8&query=javascript'
		)
		const data = await res.json()

		const videos = data?.data?.data || []

		container.innerHTML = videos
			.map(item => {
				const video = item?.items?.snippet
				const stats = item?.items?.statistics

				return `
		<div class="video-card">
			<img src="${video?.thumbnails?.high?.url || ''}" />
			<h3>${video?.title || 'No title'}</h3>
			<p>${video?.channelTitle || 'Unknown Channel'}</p>
			<p>${stats?.viewCount || 0} views</p>
		</div>
	`
			})
			.join('')
	} catch (err) {
		console.error('Error: ', err)
	}
}

fetchVideos()
