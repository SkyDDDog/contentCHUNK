# Git Commit 规范

## 1. Commit Message 格式
每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

```bash
<type>(<scope>): <subject>

<body>

<footer>
```
Header是必需的，Body和Footer则可以省略

### 1.1 Header
#### 1.Type（必需）

`type`用于说明git commit的类别，允许使用下面几个标识。

> * feat：新功能（Feature）
>
> * "feat"用于表示引入新功能或特性的变动。这种变动通常是在代码库中新增的功能，而不仅仅是修复错误或进行代码重构。
>
> * fix/to：修复bug。这些bug可能由QA团队发现，或由开发人员在开发过程中识别。
>
>   * fix关键字用于那些直接解决问题的提交。当创建一个包含必要更改的提交，并且这些更改能够直接修复已识别的bug时，应使用fix。这表明提交的代码引入了解决方案，并且问题已被立即解决。
>   * to关键字则用于那些部分处理问题的提交。在一些复杂的修复过程中，可能需要多个步骤或多次提交来完全解决问题。在这种情况下，初始和中间的提交应使用to标记，表示它们为最终解决方案做出了贡献，但并未完全解决问题。最终解决问题的提交应使用fix标记，以表明问题已被彻底修复。。
>
> * docs：文档（Documentation）
    >
    >   “docs” 表示对文档的变动，这包括对代码库中的注释、README 文件或其他文档的修改。这个前缀的提交通常用于更新文档以反映代码的变更，或者提供更好的代码理解和使用说明。
>
> * style: 格式（Format）
    >
    >   “style” 用于表示对代码格式的变动，这些变动不影响代码的运行。通常包括空格、缩进、换行等风格调整。
>
> * refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    >
    >   “refactor” 表示对代码的重构，即修改代码的结构和实现方式，但不影响其外部行为。重构的目的是改进代码的可读性、可维护性和性能，而不是引入新功能或修复错误。
>
> * perf: 优化相关，比如提升性能、体验
    >
    >   “perf” 表示与性能优化相关的变动。这可能包括对算法、数据结构或代码实现的修改，以提高代码的执行效率和用户体验。
>
> * test：增加测试
    >
    >   “test” 表示增加测试，包括单元测试、集成测试或其他类型的测试。
>
> * chore：构建过程或辅助工具的变动
    >
    >   “chore” 表示对构建过程或辅助工具的变动。这可能包括更新构建脚本、配置文件或其他与构建和工具相关的内容。
>
> * revert：回滚到上一个版本
    >
    >   “revert” 用于回滚到以前的版本，撤销之前的提交。
>
> * merge：代码合并
    >
    >   “merge” 表示进行代码合并，通常是在分支开发完成后将代码合并回主线。
>
> * sync：同步主线或分支的Bug
    >
    >   “sync” 表示同步主线或分支的 Bug，通常用于解决因为合并而引入的问题。

### 2 Scope (可选)
`scope`用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

例如修改了Dao或者Controller，则可以添加表示这些范围受到影响，这有助于更清晰地理解提交的变更影响范围。例如：

> feat(Controller): 添加用户登录功能

这个提交消息中，Controller 是 `scope`，表示这次提交影响了控制层。

> fix(DataAccess): 修复数据查询逻辑

这个提交消息中，DataAccess 是 `scope`，表示这次提交影响了数据访问层。

如果你的修改影响了不止一个`scope`，你可以使用*代替。

#### 3 Subject（必需）
subject是 commit 目的的简短描述，不超过50个字符。规范如下：
> * 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
> * 第一个字母小写
> * 结尾不加句号（.）

例如:
> feat(UserAuth): implement user authentication

这个提交消息中，`implement user authentication` 是 subject，简洁明了地描述了引入用户认证功能的目的。

> fix(Validation): correct input validation logic

这个提交消息中，`correct input validation logic` 是 subject，清晰地说明了修复输入验证逻辑的目的。

### 1.2 Body

Body 部分是对本次 commit 的详细描述，可以分成多行。Body编写有两个注意点。

> * 使用第一人称现在时，比如使用change而不是changed或changes
> * 应该说明代码变动的动机，以及与之前代码的对比。Body 部分不仅仅是描述代码的变动，还应该解释为什么进行这个变动，以及与之前的代码行为相比有哪些改进。这有助于其他开发者更好地理解代码变更的背后动机和意图。

### 1.3 Footer
Footer 部分只用于两种情况。
1. 不兼容变动

如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。

2. 关闭 Issue

如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。

> Closes #234

也可以一次关闭多个 issue 。

> Closes #123, #245, #992

