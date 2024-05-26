FROM nginx
MAINTAINER Sky_Dog<362664609@qq.com>
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/

# 添加配置文件到容器内
ADD ./default.conf /etc/nginx/conf.d/default.conf