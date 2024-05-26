FROM openjdk:17-jdk-alpine as builder

LABEL author="lear" \
	email="362664609@qq.com"

#ADD ./target/noop-knowledge-*.jar /app.jar
ADD ./noop-knowledge-*.jar /app.jar

RUN sh -c 'touch /app.jar'

EXPOSE 10004

CMD ["--server.port=10004"]

ENV JAVA_OPTS="-server -Xms256m -Xmx256m"
#ENTRYPOINT ["java", "-jar","/app.jar"]
ENTRYPOINT exec java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar /app.jar