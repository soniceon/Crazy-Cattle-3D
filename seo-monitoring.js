/**
 * SEO Monitoring and Analytics Script
 * 监控SEO关键指标和用户行为
 */

class SEOMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.setupPerformanceMonitoring();
        this.setupUserBehaviorTracking();
        this.setupErrorTracking();
        this.setupCoreWebVitals();
    }

    // 性能监控
    setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    this.trackEvent('performance', 'page_load', {
                        'dns_time': Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
                        'tcp_time': Math.round(perfData.connectEnd - perfData.connectStart),
                        'request_time': Math.round(perfData.responseEnd - perfData.requestStart),
                        'dom_ready': Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart),
                        'page_load': Math.round(perfData.loadEventEnd - perfData.navigationStart)
                    });
                }
            });
        }
    }

    // 用户行为跟踪
    setupUserBehaviorTracking() {
        // 页面停留时间
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            this.trackEvent('engagement', 'time_on_page', { value: timeSpent });
        });

        // 滚动深度
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                if (maxScrollDepth % 25 === 0) {
                    this.trackEvent('engagement', 'scroll_depth', { value: maxScrollDepth });
                }
            }
        });

        // 点击跟踪
        document.addEventListener('click', (e) => {
            const element = e.target.closest('a, button');
            if (element) {
                this.trackEvent('interaction', 'click', {
                    'element_type': element.tagName.toLowerCase(),
                    'element_text': element.textContent?.trim().substring(0, 50),
                    'element_href': element.href || 'N/A'
                });
            }
        });
    }

    // 错误跟踪
    setupErrorTracking() {
        window.addEventListener('error', (e) => {
            this.trackEvent('error', 'javascript_error', {
                'error_message': e.message,
                'error_filename': e.filename,
                'error_line': e.lineno,
                'error_column': e.colno
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.trackEvent('error', 'promise_rejection', {
                'error_reason': e.reason?.toString() || 'Unknown'
            });
        });
    }

    // Core Web Vitals 监控
    setupCoreWebVitals() {
        // LCP (Largest Contentful Paint)
        if ('PerformanceObserver' in window) {
            try {
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.trackEvent('web_vitals', 'lcp', {
                        'value': Math.round(lastEntry.startTime),
                        'element': lastEntry.element?.tagName || 'unknown'
                    });
                }).observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.warn('LCP monitoring not supported');
            }

            // FID (First Input Delay)
            try {
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        this.trackEvent('web_vitals', 'fid', {
                            'value': Math.round(entry.processingStart - entry.startTime),
                            'event_type': entry.name
                        });
                    });
                }).observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.warn('FID monitoring not supported');
            }

            // CLS (Cumulative Layout Shift)
            try {
                let clsValue = 0;
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    this.trackEvent('web_vitals', 'cls', {
                        'value': Math.round(clsValue * 1000)
                    });
                }).observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.warn('CLS monitoring not supported');
            }
        }
    }

    // 事件跟踪
    trackEvent(category, action, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                ...parameters
            });
        }
        
        // 控制台日志（开发环境）
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`SEO Event: ${category} - ${action}`, parameters);
        }
    }

    // 手动跟踪方法
    trackGameStart() {
        this.trackEvent('game', 'start', {
            'game_name': 'Crazy Cattle 3D',
            'timestamp': Date.now()
        });
    }

    trackGameEnd() {
        this.trackEvent('game', 'end', {
            'game_name': 'Crazy Cattle 3D',
            'timestamp': Date.now()
        });
    }

    trackSectionView(sectionName) {
        this.trackEvent('navigation', 'section_view', {
            'section_name': sectionName,
            'timestamp': Date.now()
        });
    }
}

// 初始化SEO监控
const seoMonitor = new SEOMonitor();

// 导出到全局作用域
window.SEOMonitor = seoMonitor;
