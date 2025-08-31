// 全局变量
let swiper = null;
let chinaChart = null;
let currentTheme = 'light';

// 中国地图数据（简化版）
const chinaGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "山西省"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[110, 35], [115, 35], [115, 40], [110, 40], [110, 35]]]
      }
    },
    {
      "type": "Feature", 
      "properties": {
        "name": "山东省"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[115, 35], [120, 35], [120, 40], [115, 40], [115, 35]]]
      }
    }
  ]
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化...');
    
    // 初始化图标
    lucide.createIcons();
    
    // 初始化Swiper轮播图
    initSwiper();
    
    // 初始化中国地图
    initChinaMap();
    
    // 初始化主题切换
    initThemeToggle();
    
    // 初始化事件监听
    initEventListeners();
});

// 初始化Swiper轮播图
function initSwiper() {
    console.log('初始化Swiper轮播图...');
    
    const swiperContainer = document.getElementById('swiperContainer');
    if (!swiperContainer) {
        console.error('Swiper容器未找到');
        return;
    }
    
    try {
        swiper = new Swiper(swiperContainer, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            speed: 1000,
            effect: 'slide'
        });
        
        console.log('Swiper初始化成功');
    } catch (error) {
        console.error('Swiper初始化失败:', error);
    }
}

// 初始化中国地图
function initChinaMap() {
    console.log('初始化中国地图...');
    
    const chartContainer = document.getElementById('chinaChart');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (!chartContainer) {
        console.error('地图容器未找到');
        return;
    }
    
    // 模拟加载延迟
    setTimeout(() => {
        try {
            // 注册中国地图
            echarts.registerMap('china', chinaGeoJSON);
            
            // 初始化图表
            chinaChart = echarts.init(chartContainer, null, {
                devicePixelRatio: window.devicePixelRatio || 1,
                renderer: 'canvas',
                useDirtyRect: false,
                width: chartContainer.clientWidth,
                height: chartContainer.clientHeight
            });
            
            // 添加点击事件监听
            chinaChart.on('click', (params) => {
                if (params.componentType === 'series') {
                    console.log('选中省份:', params.name);
                    showProvinceInfo(params.name);
                }
            });
            
            // 配置地图选项
            const option = {
                animation: true,
                animationDuration: 1000,
                backgroundColor: '#ffffff',
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(220, 38, 38, 0.95)',
                    borderColor: '#DC2626',
                    borderWidth: 1,
                    textStyle: {
                        color: '#ffffff'
                    },
                    formatter: function(params) {
                        if (params.name === '山西省' || params.name === '山东省') {
                            return `
                                <div style="padding: 8px;">
                                    <div style="font-weight: bold; margin-bottom: 8px;">${params.name}</div>
                                    <div style="font-size: 12px;">
                                        <div>实践时间: 2024年暑期</div>
                                        <div>调研内容: 非遗文化传承</div>
                                        <div>实践成果: 调研报告</div>
                                    </div>
                                </div>
                            `;
                        }
                        return params.name;
                    }
                },
                series: [
                    {
                        name: '实践足迹',
                        type: 'map',
                        map: 'china',
                        roam: true,
                        zoom: 1.2,
                        center: [105, 36],
                        itemStyle: {
                            areaColor: '#f3f4f6',
                            borderColor: '#e5e7eb',
                            borderWidth: 1
                        },
                        emphasis: {
                            itemStyle: {
                                areaColor: '#fef2f2',
                                borderColor: '#dc2626',
                                borderWidth: 2
                            }
                        },
                        select: {
                            itemStyle: {
                                areaColor: '#fee2e2',
                                borderColor: '#dc2626',
                                borderWidth: 3
                            }
                        },
                        data: [
                            {
                                name: '山西省',
                                value: 100,
                                itemStyle: {
                                    areaColor: '#dc2626',
                                    borderColor: '#dc2626',
                                    borderWidth: 2
                                }
                            },
                            {
                                name: '山东省',
                                value: 100,
                                itemStyle: {
                                    areaColor: '#dc2626',
                                    borderColor: '#dc2626',
                                    borderWidth: 2
                                }
                            }
                        ]
                    }
                ]
            };
            
            // 设置配置项
            chinaChart.setOption(option);
            
            // 隐藏加载指示器
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            
            console.log('中国地图初始化成功');
            
            // 添加窗口大小变化监听
            window.addEventListener('resize', function() {
                if (chinaChart) {
                    chinaChart.resize();
                }
            });
            
        } catch (error) {
            console.error('中国地图初始化失败:', error);
            if (loadingIndicator) {
                loadingIndicator.innerHTML = '<span style="color: #ef4444;">地图加载失败，请刷新页面重试</span>';
            }
        }
    }, 1000);
}

// 显示省份信息
function showProvinceInfo(provinceName) {
    const info = {
        '山西省': {
            title: '山西省社会实践',
            content: '深入山西各地，调研非遗文化传承现状，重点关注传统手工艺、民间艺术等非物质文化遗产的保护与传承。',
            achievements: ['完成15份调研报告', '访谈50+位非遗传承人', '收集100+件非遗资料']
        },
        '山东省': {
            title: '山东省社会实践',
            content: '走访山东各地，深入了解齐鲁文化传承，重点关注传统建筑、民间工艺、地方戏曲等文化形式。',
            achievements: ['完成12份调研报告', '访谈60+位文化工作者', '整理80+份文化资料']
        }
    };
    
    const provinceInfo = info[provinceName];
    if (provinceInfo) {
        alert(`${provinceInfo.title}\n\n${provinceInfo.content}\n\n主要成果:\n${provinceInfo.achievements.join('\n')}`);
    }
}

// 初始化主题切换
function initThemeToggle() {
    console.log('初始化主题切换...');
    
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.error('主题切换按钮未找到');
        return;
    }
    
    // 从localStorage获取保存的主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // 添加点击事件
    themeToggle.addEventListener('click', function() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// 设置主题
function setTheme(theme) {
    currentTheme = theme;
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        body.classList.add('dark');
        body.setAttribute('data-theme', 'dark');
        if (themeToggle) {
            themeToggle.innerHTML = '<i data-lucide="sun" class="h-5 w-5"></i>';
        }
    } else {
        body.classList.remove('dark');
        body.setAttribute('data-theme', 'light');
        if (themeToggle) {
            themeToggle.innerHTML = '<i data-lucide="moon" class="h-5 w-5"></i>';
        }
    }
    
    // 重新创建图标
    lucide.createIcons();
    
    // 更新地图主题
    updateMapTheme(theme);
}

// 更新地图主题
function updateMapTheme(theme) {
    if (!chinaChart) return;
    
    const backgroundColor = theme === 'dark' ? '#1e293b' : '#ffffff';
    const areaColor = theme === 'dark' ? '#334155' : '#f3f4f6';
    const borderColor = theme === 'dark' ? '#475569' : '#e5e7eb';
    
    const option = chinaChart.getOption();
    option.backgroundColor = backgroundColor;
    option.series[0].itemStyle.areaColor = areaColor;
    option.series[0].itemStyle.borderColor = borderColor;
    
    chinaChart.setOption(option);
}

// 初始化事件监听
function initEventListeners() {
    console.log('初始化事件监听...');
    
    // 实践成果按钮点击事件
    const practiceResultsBtn = document.getElementById('practiceResultsBtn');
    if (practiceResultsBtn) {
        practiceResultsBtn.addEventListener('click', function() {
            handlePracticeResults();
        });
    }
    
    // 页面滚动事件（用于导航栏隐藏/显示）
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header-glass');
        if (!header) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动且超过100px时隐藏导航栏
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动时显示导航栏
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 处理实践成果按钮点击
function handlePracticeResults() {
    console.log('点击实践成果按钮');
    
    // 尝试打开Architecture页面
    try {
        const architectureUrl = '../Architecture/index.html';
        
        // 检查页面是否存在
        fetch(architectureUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    window.open(architectureUrl, '_blank');
                } else {
                    showPracticeResultsModal();
                }
            })
            .catch(() => {
                showPracticeResultsModal();
            });
    } catch (error) {
        console.error('打开实践成果页面失败:', error);
        showPracticeResultsModal();
    }
}

// 显示实践成果模态框
function showPracticeResultsModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        margin: 1rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    `;
    
    content.innerHTML = `
        <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: #dc2626;">
            社会实践成果展示
        </h3>
        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">调研成果</h4>
            <ul style="list-style: disc; margin-left: 1.5rem; color: #4b5563;">
                <li>完成27份深度调研报告</li>
                <li>访谈110+位相关人士</li>
                <li>收集180+份文化资料</li>
                <li>拍摄500+张实地照片</li>
            </ul>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">实践收获</h4>
            <p style="color: #4b5563; line-height: 1.6;">
                通过深入山西、山东两省的实地调研，我们深刻了解了当地非遗文化的传承现状，
                发现了许多珍贵的文化瑰宝，也认识到了文化传承面临的挑战和机遇。
            </p>
        </div>
        <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" 
                style="background: #dc2626; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer;">
            关闭
        </button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 点击背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 页面卸载时清理资源
window.addEventListener('beforeunload', function() {
    if (swiper) {
        swiper.destroy(true, true);
    }
    
    if (chinaChart && !chinaChart.isDisposed()) {
        chinaChart.dispose();
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(e) {
    console.error('未处理的Promise拒绝:', e.reason);
}); 